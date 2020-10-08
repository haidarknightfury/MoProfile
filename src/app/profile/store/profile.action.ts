import { Action } from '@ngrx/store';

export const UPDATE_SECTION = 'UPDATE_SECTION';
export const RESET_SECTION = 'RESET_SECTION';
export const FETCH_SECTION = 'FETCH_SECTION';
export const SECTION_RETRIEVED = 'SECTION_RETRIEVED';

export class UpdatePersonalAction implements Action {
  type: string = UPDATE_SECTION;
  constructor(public payload: any) {}
}

export class ResetSection implements Action {
  type: string = RESET_SECTION;
  constructor(public payload: any) {}
}

export class FetchSection implements Action {
  type: string = FETCH_SECTION;
  constructor(public payload: any) {}
}

export class SectionRetrieved implements Action {
  type: string = SECTION_RETRIEVED;
  constructor(public payload: any) {}
}

export type ProfileAction = UpdatePersonalAction | ResetSection | FetchSection | SectionRetrieved;
