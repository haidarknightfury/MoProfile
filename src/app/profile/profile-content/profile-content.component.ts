

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
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ProfileState } from '../store/profile.reducer';
import * as ProfileAction from '../store/profile.action';

@Component({
  selector: 'app-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.css'],
  providers: [BaseProfileContentService],
})
export class ProfileContentComponent implements OnInit {
  public subsections: SubsectionMetadata[];
  public authState: Observable<AuthStore.AuthState>;
  public profileState: Observable<any>;

  constructor(
    private baseProfileContentService: BaseProfileContentService,
    private router: Router,
    private store: Store<ProfileState>,
  ) {}

  ngOnInit(): void {
    this.authState = this.store.select('auth')
    this.subsections = this.baseProfileContentService.getSubsectionMetadata();
    this.profileState = this.store.select('profile');
  }

  saveProfile(event: any) {
    console.warn(event);
    this.store.dispatch(new ProfileAction.UpdatePersonalAction(event))
  }

  resetProfile(){
    this.store.dispatch(new ProfileAction.ResetSection({}));
  }

  exit() {
    this.store.dispatch(new AuthAction.Logout({}));
    this.router.navigate(['/', 'auth', 'login']);
  }
}
