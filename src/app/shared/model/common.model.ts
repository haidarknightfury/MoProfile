import { ValidatorFn, FormGroup } from '@angular/forms';

export interface FieldMetadata {
  id: string;
  defaultValue: string;
  label: string;
  type: string;
  name: string;
  validators: ValidatorFn[];
}

export interface SubsectionMetadata {
  name: string,
  heading: string
  subsection: FormGroup;
  fields: FieldMetadata[];
}
