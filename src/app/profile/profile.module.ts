import { ProfileEffect } from './store/profile.effects';
import { Effect, EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileContentComponent } from './profile-content/profile-content.component';
import { ProfileRouting } from './profile.routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';

import { profileReducer } from './store/profile.reducer';
import { BaseProfileContentService } from './service/profile-content.service';

@NgModule({
  declarations: [ProfileContentComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProfileRouting,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature('profile', profileReducer),
    EffectsModule.forFeature([ProfileEffect])
  ],
  providers: [BaseProfileContentService]
})
export class ProfileModule {}
