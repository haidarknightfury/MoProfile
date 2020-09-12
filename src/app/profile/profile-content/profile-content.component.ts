import { BaseProfileContentService } from './../service/profile-content.service';
import { FieldMetadata, SubsectionMetadata } from './../../shared/model/common.model';

import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthStore from '../../auth/store/auth.reducer';
import * as AuthAction from '../../auth/store/auth.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.css'],
  providers: [BaseProfileContentService],
})
export class ProfileContentComponent implements OnInit {

  public subsections: SubsectionMetadata[];
  public authState: Observable<AuthStore.AuthState>;

  constructor(
    private baseProfileContentService: BaseProfileContentService,
    private router: Router,
    private store: Store<{ auth: AuthStore.AuthState }>
  ) {}

  ngOnInit(): void {
    this.authState = this.store.select('auth');
    this.subsections = this.baseProfileContentService.getSubsectionMetadata();
  }

  saveProfile(event: any) {
    console.warn(event);
  }

  exit() {
    this.store.dispatch(new AuthAction.Logout({}));
    this.router.navigate(['/', 'auth', 'login']);
  }
}
