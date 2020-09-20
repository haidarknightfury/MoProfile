import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, take } from 'rxjs/operators';
import * as ProfileAction from './profile.action';
import { ProfileState } from './profile.reducer';
import { HttpClient } from '@angular/common/http';
import { BaseProfileContentService } from '../service/profile-content.service';

@Injectable()
export class ProfileEffect {
  constructor(private action$: Actions,
              private router: Router,
              private profileService: BaseProfileContentService,
              private store: Store<ProfileState>) {}



  @Effect({dispatch: false})
  updateProfileEffect = this.action$.pipe(
      ofType(ProfileAction.UPDATE_SECTION),
      switchMap((action: ProfileAction.UpdatePersonalAction)=> {
          const profile$ = this.store.select('profile');
          return profile$.pipe(take(1) , map((profile) => {
                return { ...profile, ...action.payload }
          }));
      }),
      map((payload)=> { console.log(payload); return payload })
  )

}
