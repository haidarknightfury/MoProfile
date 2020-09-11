import { ValidatorFn} from '@angular/forms';

export interface FieldMetadata {
    id: string;
    defaultValue: string;
    label: string;
    type: string;
    name: string;
    validators: ValidatorFn[];
  }