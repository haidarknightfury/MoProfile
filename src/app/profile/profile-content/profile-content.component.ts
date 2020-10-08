import {
  BaseProfileContentService,
  Profile,
} from './../service/profile-content.service';
import {
  FieldMetadata,
  SubsectionMetadata,
} from './../../shared/model/common.model';

import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthStore from '../../auth/store/auth.reducer';
import * as AuthAction from '../../auth/store/auth.action';
import { Observable, interval, of, BehaviorSubject } from 'rxjs';
import { tap, map, switchMap, take, mergeMap } from 'rxjs/operators';
import * as ProfileStore from '../store/profile.reducer';
import * as ProfileAction from '../store/profile.action';

@Component({
  selector: 'app-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.css'],
})
export class ProfileContentComponent implements OnInit {
  public subsections: SubsectionMetadata[];
  public authState: Observable<AuthStore.AuthState>;
  public profileState: Observable<ProfileStore.State>;
  public letters$ = new BehaviorSubject('Y');

  constructor(
    private baseProfileContentService: BaseProfileContentService,
    private router: Router,
    private store: Store<ProfileStore.ProfileState>
  ) {}

  ngOnInit(): void {
    this.authState = this.store.select('auth');
    this.subsections = this.baseProfileContentService.getSubsectionMetadata();

    this.subsections.forEach((subsection)=>{
      const createdFields = this.createFields(subsection.fields);
      subsection.subsection = new FormGroup(createdFields);
    });

    this.profileState = this.store.select('profile').pipe(
      tap((profile) => {
        this.subsections?.forEach((sub) => {
          console.log(`setting value for ${sub.name}`);
          console.log(profile[sub.name]);
          console.log(sub.subsection);
          sub.subsection?.patchValue(profile[sub.name]);
        });
      })
    );


    this.baseProfileContentService.profileUpdated.subscribe((response) => {
      console.log('updated' + response);
    });

    this.store.dispatch(new ProfileAction.FetchSection({}));
  }

  saveProfile(event: any) {
    console.info(event);
    this.store.dispatch(new ProfileAction.UpdatePersonalAction(event));
  }

  resetProfile() {
    this.store.dispatch(new ProfileAction.ResetSection({}));
  }

  exit() {
    this.store.dispatch(new AuthAction.Logout({}));
    this.router.navigate(['/', 'auth', 'login']);
  }


  createFormControl(fieldMetadata: FieldMetadata): any {
    return {
      [fieldMetadata.name]: new FormControl(
        fieldMetadata.defaultValue, [...fieldMetadata.validators]
      ),
    };
  }

  createFields(fields: FieldMetadata[]) {
    let formGroup = {};
    fields.forEach((field) => {
      const control = this.createFormControl(field);
      formGroup = { ...formGroup, ...control };
    });
    console.log(formGroup);
    return formGroup;
  }

}
