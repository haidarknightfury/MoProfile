import { HttpClient, HttpHeaders } from '@angular/common/http';
import { defaultState } from './../../shared/animation.shared';
import {
  FieldMetadata,
  SubsectionMetadata,
} from './../../shared/model/common.model';
import { Validators, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { ProfileState } from '../store/profile.reducer';
import { throwError, Subject } from 'rxjs';
import { retry, catchError, tap,  } from 'rxjs/operators';

export interface Profile {
  personal: {
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
  };
  work: {
    company: string;
  };
}

const API_URL = 'http://localhost:8081';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable()
export class BaseProfileContentService {


  constructor(private http: HttpClient) {}

  public profileUpdated: Subject<Profile> = new Subject();

  getSubsectionMetadata(): SubsectionMetadata[] {
    let personal: FormGroup;
    let personalFields: FieldMetadata[] = this.getPersonalFieldMeta();

    let work: FormGroup;
    let workFields: FieldMetadata[] = this.getWorkFieldMeta();

    let personalSection: SubsectionMetadata = {
      name: 'personal',
      heading: 'Personal details',
      subsection: personal,
      fields: personalFields,
    };
    let workSection: SubsectionMetadata = {
      name: 'work',
      heading: 'Work details',
      subsection: work,
      fields: workFields,
    };

    return [personalSection, workSection];
  }

  getPersonalFieldMeta(): FieldMetadata[] {
    const emailFieldMetadata: FieldMetadata = {
      name: 'email',
      defaultValue: '',
      id: 'txtEmail',
      label: 'Email address',
      type: 'email',
      validators: [Validators.required, Validators.email],
    };

    const fNameFieldMetadata: FieldMetadata = {
      name: 'firstName',
      defaultValue: '',
      id: 'txtFName',
      label: 'First name',
      type: 'text',
      validators: [Validators.required],
    };

    const lNameFieldMetadata: FieldMetadata = {
      name: 'lastName',
      defaultValue: '',
      id: 'txtLName',
      label: 'Last name',
      type: 'text',
      validators: [Validators.required],
    };
    return [emailFieldMetadata, fNameFieldMetadata, lNameFieldMetadata];
  }

  getWorkFieldMeta(): FieldMetadata[] {
    const companyName: FieldMetadata = {
      name: 'company',
      defaultValue: '',
      id: 'txtCompany',
      label: 'Company',
      type: 'text',
      validators: [Validators.required],
    };

    return [companyName];
  }

  updateProfile(profile: Profile) {
    return this.http.post(`${API_URL}/profile`, profile, httpOptions)
                    .pipe(
                         retry(1), 
                         tap ((response:Profile)=> this.profileUpdated.next(response)),
                         catchError(this.handleError));
  }

  handleError(error) {
    let errorMessage = '';
    errorMessage =
      error.error instanceof ErrorEvent
        ? error.error.message
        : `Error Code: ${error.status}\nMessage: ${error.message}`;
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
