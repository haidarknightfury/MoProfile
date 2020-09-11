import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileContentComponent } from './profile-content/profile-content.component';
import { ProfileRouting } from './profile.routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProfileContentComponent],
  imports: [CommonModule, SharedModule, ProfileRouting, ReactiveFormsModule, FormsModule]
})
export class ProfileModule { }
