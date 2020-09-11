import { FieldMetadata } from './../../shared/model/common.model';

import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.css']
})
export class ProfileContentComponent implements OnInit {

  public personal: FormGroup;
  public personalFields: FieldMetadata[];

  constructor() { }

  ngOnInit(): void {
    this.personalFields = this.createFieldsMetas();
  }

  saveProfile(event: any){
    console.warn(event);
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

}
