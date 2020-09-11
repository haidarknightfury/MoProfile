import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormCardComponent } from './reactive-form-card/reactive-form-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ReactiveFormCardComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ],
  exports: [ReactiveFormCardComponent]
})
export class SharedModule { }
