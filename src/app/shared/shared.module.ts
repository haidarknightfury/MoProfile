import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormCardComponent } from './reactive-form-card/reactive-form-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrettyprintPipe } from './pipe/prettyprint.pipe';


@NgModule({
  declarations: [ReactiveFormCardComponent, PrettyprintPipe],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ],
  exports: [ReactiveFormCardComponent, PrettyprintPipe]
})
export class SharedModule { }
