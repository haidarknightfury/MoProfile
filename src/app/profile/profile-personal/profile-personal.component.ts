import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Store } from '@ngrx/store';


export interface FieldMetadata {
  id: string;
  defaultValue: string;
  label: string;
  type: string;
  name: string;
  validators: ValidationErrors[];
}

@Component({
  selector: 'app-profile-personal',
  templateUrl: './profile-personal.component.html',
  styleUrls: ['./profile-personal.component.css'],
})
export class ProfilePersonalComponent implements OnInit {
  public fieldsMetas: FieldMetadata[] = [];

  constructor() {}

  personal: FormGroup;

  ngOnInit(): void {
    this.fieldsMetas = this.createFieldsMetas();
    const createdFields = this.createFields(this.fieldsMetas);
    this.personal = new FormGroup(createdFields);
  }

  saveChanges() {
    console.log(this.personal.value);
  }

  createFieldsMetas(): FieldMetadata[] {
    let emailFieldMetadata: FieldMetadata = {
      name: 'email',
      defaultValue: '',
      id: 'txtEmail',
      label: 'Email address',
      type: 'email',
      validators: [Validators.required, Validators.email],
    };

    let fNameFieldMetadata: FieldMetadata = {
      name: 'firstName',
      defaultValue: '',
      id: 'txtFName',
      label: 'First name',
      type: 'text',
      validators: [Validators.required],
    };
    return [emailFieldMetadata, fNameFieldMetadata];
  }

  createFormControl(fieldMetadata: FieldMetadata): any {
    return {
      [fieldMetadata.name]: new FormControl(
        fieldMetadata.defaultValue,
        ...fieldMetadata.validators
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
