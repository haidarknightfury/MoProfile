import { HttpClient, HttpHeaders } from '@angular/common/http';
import { defaultState } from './../../shared/animation.shared';
import { FieldMetadata, SubsectionMetadata} from './../../shared/model/common.model';
import { Validators, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { ProfileState } from '../store/profile.reducer';
import { throwError, Subject, Observable } from 'rxjs';
import { retry, catchError, tap,  } from 'rxjs/operators';

const API_URL = 'http://localhost:8081';

export interface Profile {
  username: string;
  personal: {
    firstName: string;
    lastName: string;
    gender: string;
    title: string;
    dateOfBirth: Date;
    email: string;
  };
  work: {
    company: string;
  };
}

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
    let work: FormGroup;
    
    let personalSection: SubsectionMetadata = {
      name: 'personal',
      heading: 'Personal details',
      subsection: personal,
      fields: this.getPersonalFieldMeta(),
    };
    let workSection: SubsectionMetadata = {
      name: 'work',
      heading: 'Work details',
      subsection: work,
      fields: this.getWorkFieldMeta(),
    };

    return [personalSection, workSection];
  }

  getPersonalFieldMeta(): FieldMetadata[] {
    const emailFieldMetadata: FieldMetadata = {
      name: 'email',
      defaultValue: '',
      id: 'txtEmail',
      label: 'Email address',
      type: 'text',
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

    const titleFieldMetadata: FieldMetadata = {
      name: 'title',
      defaultValue: '',
      id: 'title',
      label: 'Title',
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

    const genderFieldMetadata : FieldMetadata = {
      name: 'gender',
      defaultValue: 'Male',
      id: 'txtGender',
      label: 'Gender',
      type: 'text',
      validators: [],
    }
    return [fNameFieldMetadata, lNameFieldMetadata, titleFieldMetadata, genderFieldMetadata, emailFieldMetadata];
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
                         tap ((response:Profile)=> this.profileUpdated.next(response)),
                         catchError(this.handleError));
  }

  fetchProfile(): Observable <Profile> {
    return this.http.get<Profile>(`${API_URL}/profile`, httpOptions);
  }


  handleError(error) {
    let errorMessage = '';
    errorMessage = error.error instanceof ErrorEvent ? error.error.message : `Error Code: ${error.status}\nMessage: ${error.message}`;
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
