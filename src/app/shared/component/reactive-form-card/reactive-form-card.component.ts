
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { formEntryAnimation } from '../../animation.shared';
import { FieldMetadata } from '../../model/common.model';

@Component({
  selector: 'app-reactive-form-card',
  templateUrl: './reactive-form-card.component.html',
  styleUrls: ['./reactive-form-card.component.css'],
  animations: [formEntryAnimation]
})
export class ReactiveFormCardComponent implements OnInit {

  @Input('heading')
  public subsectionHeading: string

  @Input('subsection')
  public subsection: FormGroup;

  @Input('subsectionname')
  public subsectionName: string;

  @Input('fields')
  public fields: FieldMetadata[];

  @Output() public onSave = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    console.log(`received fields:  `+ this.fields)
    // const createdFields = this.createFields(this.fields);
    // this.subsection = new FormGroup(createdFields);

  }

  saveChanges() {
    const obj = {}
    obj[this.subsectionName] = this.subsection.value;
    console.log(`${JSON.stringify(obj)}`)
    this.onSave.emit(obj);
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

