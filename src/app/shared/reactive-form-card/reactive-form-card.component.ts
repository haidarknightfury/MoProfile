import { FieldMetadata } from './../../profile/profile-personal/profile-personal.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-reactive-form-card',
  templateUrl: './reactive-form-card.component.html',
  styleUrls: ['./reactive-form-card.component.css']
})
export class ReactiveFormCardComponent implements OnInit {

  @Input('fields')
  public fieldsMetas: FieldMetadata[] = [];

  @Output()
  public onSave:EventEmitter<void> = new EventEmitter();

  constructor() {}

  personal: FormGroup;

  ngOnInit(): void {
    this.fieldsMetas = this.createFieldsMetas();
    const createdFields = this.createFields(this.fieldsMetas);
    this.personal = new FormGroup(createdFields);
  }

  saveChanges() {
    this.onSave.emit(this.personal.value);
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
