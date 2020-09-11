import { Action } from '@ngrx/store';

export const TRY_LOGIN = 'TRY_LOGIN';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export class TryLogin implements Action {
  type: string = TRY_LOGIN;
  constructor(public payload: any) {}
}

export class Login implements Action {
  type: string = LOGIN;
  constructor(public payload: any) {}
}

export class Logout implements Action {
  type: string = LOGOUT;
  constructor(public payload: any) {}
}

export type AUTH_ACTIONS = TryLogin | Login | Logout;
