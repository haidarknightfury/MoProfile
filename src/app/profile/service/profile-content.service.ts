import { defaultState } from './../../shared/animation.shared';
import { FieldMetadata } from './../../shared/model/common.model';
import { Validators } from '@angular/forms';
import { Injectable } from '@angular/core';


@Injectable()
export class BaseProfileContentService {
  
  constructor() {}

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


}
