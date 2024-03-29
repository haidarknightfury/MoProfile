import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import * as ProfileAction from './profile.action';
import { ProfileState } from './profile.reducer';
import { HttpClient } from '@angular/common/http';
import { BaseProfileContentService } from '../service/profile-content.service';

@Injectable()
export class ProfileEffect {
  constructor(private action$: Actions,
              private profileService: BaseProfileContentService,
              private store: Store<ProfileState>) {}


  @Effect({dispatch: false})
  updateProfileEffect = this.action$.pipe(
      ofType(ProfileAction.UPDATE_SECTION),
      switchMap((action: ProfileAction.UpdatePersonalAction) => {
          console.log('starting update of profile in profile effects');
          const profile$ = this.store.select('profile');
          return profile$.pipe(take(1) , map((profile) => {
                return { ...profile, ...action.payload }
          }));
      }),
      withLatestFrom(this.store.select('auth')),
      map(([payload, auth])=> { 
         this.profileService.updateProfile(payload).pipe(
             map((response)=> {console.log(`updating profile ${response.username}`); return response; })
         ).subscribe(console.log); 
        }
      )
  );

  @Effect({dispatch: true})
  fetchProfileEffect = this.action$.pipe(
    ofType(ProfileAction.FETCH_SECTION),
    switchMap((_) => this.profileService.fetchProfile()),
    map((profile)=> { 
        return { 
           type: ProfileAction.SECTION_RETRIEVED,
           payload: profile
        }
      })
  );
}