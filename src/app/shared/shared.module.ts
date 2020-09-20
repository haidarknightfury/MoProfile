import { ReactiveFormCardComponent } from './component/reactive-form-card/reactive-form-card.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrettyprintPipe } from './pipe/prettyprint.pipe';
import { BreadcrumbComponent } from './component/breadcrumb/breadcrumb.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ReactiveFormCardComponent,
    PrettyprintPipe,
    BreadcrumbComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  exports: [ReactiveFormCardComponent, PrettyprintPipe],
})
export class SharedModule {}
