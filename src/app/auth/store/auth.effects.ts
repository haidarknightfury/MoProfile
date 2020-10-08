import { AuthService, LoginResponse } from './../service/auth.service';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Actions, Effect, ofType, act } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as AuthActions from './auth.action';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService
  ) {}

  @Effect({ dispatch: true })
  authLoginEffect = this.actions$.pipe(
    ofType(AuthActions.TRY_LOGIN),
    map((action: AuthActions.TryLogin) => action.payload),
    switchMap((authData: { username: string; password: string }) =>
      this.authService.login(authData)
    ),
    mergeMap((loginResponse: LoginResponse) => {
      return loginResponse.jwtToken? [
            {
              type: AuthActions.LOGIN,
              payload: loginResponse.jwtToken,
            },
          ]
        : [{ type: AuthActions.LOGOUT, payload: '' }];
    })
  );

  @Effect({ dispatch: false })
  loggedInEffect = this.actions$.pipe(
    ofType(AuthActions.LOGIN),
    tap((response) => {
      this.router.navigate(['/profile']);
    })
  );
}
