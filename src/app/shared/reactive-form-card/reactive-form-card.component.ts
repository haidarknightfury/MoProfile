import { FieldMetadata } from './../model/common.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-reactive-form-card',
  templateUrl: './reactive-form-card.component.html',
  styleUrls: ['./reactive-form-card.component.css']
})
export class ReactiveFormCardComponent implements OnInit {

  @Input('heading')
  public subsectionHeading: string

  @Input('subsection')
  public subsection: FormGroup;

  @Input('fields')
  public fields: FieldMetadata[];

  @Output() public onSave = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    console.log(`received fields:  `+ this.fields)
    const createdFields = this.createFields(this.fields);
    this.subsection = new FormGroup(createdFields);

  }

  saveChanges() {
    console.log(`${JSON.stringify(this.subsection.value)}`)
    this.onSave.emit(this.subsection.value);
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

