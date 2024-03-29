import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AuthEffects } from './store/auth.effects';
import { AuthService } from './service/auth.service';
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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({ auth: AuthReducer }),
    EffectsModule.forRoot([AuthEffects]),
  ],
  providers: [AuthService, {provide:HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}]
})
export class AuthModule {}
