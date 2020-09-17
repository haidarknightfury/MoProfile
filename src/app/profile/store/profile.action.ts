import { Action } from '@ngrx/store';

export const UPDATE_SECTION = 'UPDATE_SECTION';
export const RESET_SECTION = 'RESET_SECTION';

export class UpdatePersonalAction implements Action {
  type: string = UPDATE_SECTION;
  constructor(public payload: any) {}
}

export class ResetSection implements Action {
  type: string = RESET_SECTION;
  constructor(public payload: any) {}
}

export type ProfileAction = UpdatePersonalAction | ResetSection;
