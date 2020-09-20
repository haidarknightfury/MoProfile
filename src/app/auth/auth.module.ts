import { EffectsModule } from '@ngrx/effects';
import { AuthRoutingModule } from './auth.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { AuthReducer } from './store/auth.reducer';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ auth: AuthReducer }),
    EffectsModule.forRoot(),
  ],
})
export class AuthModule {}
