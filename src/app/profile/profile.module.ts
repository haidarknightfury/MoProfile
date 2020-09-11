import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileContentComponent } from './profile-content/profile-content.component';
import { ProfileRouting } from './profile.routing.module';
import { ProfilePersonalComponent } from './profile-personal/profile-personal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProfileContentComponent, ProfilePersonalComponent],
  imports: [CommonModule, ProfileRouting, ReactiveFormsModule, FormsModule]
})
export class ProfileModule { }
