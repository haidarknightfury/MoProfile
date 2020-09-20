

import { BaseProfileContentService } from './../service/profile-content.service';
import {
  FieldMetadata,
  SubsectionMetadata,
} from './../../shared/model/common.model';

import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthStore from '../../auth/store/auth.reducer';
import * as AuthAction from '../../auth/store/auth.action';
import { Observable, interval, of, BehaviorSubject } from 'rxjs';
import { tap, map, switchMap, take, mergeMap } from 'rxjs/operators';
import { ProfileState } from '../store/profile.reducer';
import * as ProfileAction from '../store/profile.action';

@Component({
  selector: 'app-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.css'],
})
export class ProfileContentComponent implements OnInit {
  public subsections: SubsectionMetadata[];
  public authState: Observable<AuthStore.AuthState>;
  public profileState: Observable<any>;
  public letters$ = new BehaviorSubject("Y");;

  constructor(
    private baseProfileContentService: BaseProfileContentService,
    private router: Router,
    private store: Store<ProfileState>,
  ) {}

  ngOnInit(): void {
    this.authState = this.store.select('auth')
    this.subsections = this.baseProfileContentService.getSubsectionMetadata();
    this.profileState = this.store.select('profile');


    const numbers$ = interval(1000)
    let obs = this.letters$.pipe(switchMap((l)=> numbers$.pipe(take(5), map((x)=> x+ l))))
   // obs.subscribe(console.log);



    let obs2 = this.letters$.pipe(mergeMap((l)=> numbers$.pipe(take(4), map((x)=> x+ l))));
    obs2.subscribe(console.log);
    this.letters$.next("X");
    this.letters$.next("A");

  }

  saveProfile(event: any) {
    console.warn(event);
    this.store.dispatch(new ProfileAction.UpdatePersonalAction(event))
  }

  resetProfile(){
    this.letters$.next("II");
    this.store.dispatch(new ProfileAction.ResetSection({}));
  }

  exit() {
    this.store.dispatch(new AuthAction.Logout({}));
    this.router.navigate(['/', 'auth', 'login']);
  }
}
