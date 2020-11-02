import { Profile } from './../service/profile-content.service';
import { AppState } from './../../shared/state/app.state';
import * as ProfileAction from './profile.action';
import { AuthState } from 'src/app/auth/store/auth.reducer';

export interface ProfileState extends AppState {
  profile: State;
}

export interface State extends Profile {}

const initialState: State = {
  username: '',
  personal: {
    email: '',
    firstName: '',
    lastName: '',
    gender: 'Male',
    title: '',
    dateOfBirth: new Date()
  },
  work: {
    company: '',
  },
};

export function profileReducer(state: State = initialState, action: ProfileAction.ProfileAction) {
  switch (action.type) {
    case ProfileAction.UPDATE_SECTION:
    case ProfileAction.SECTION_RETRIEVED:  
      return { ...state, ...action.payload };
    case ProfileAction.RESET_SECTION:
      return { ...initialState };
    default:
      return state;
  }
}
