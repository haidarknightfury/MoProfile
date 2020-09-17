import * as ProfileAction from './profile.action';
import { AuthState } from 'src/app/auth/store/auth.reducer';


export interface AppState {
    auth: AuthState
}
export interface ProfileState extends AppState {
        profile: State
}
export interface State {
    personal : {
        email: string;
        firstName: string;
        lastName: string;
    };
    work :{
        company: string;
    }
}

const initialState: State = {
  personal: {
    email: '',
    firstName: '',
    lastName: '',
  },
  work: {
    company: '',
  },
};

export function profileReducer(state: State = initialState, action:ProfileAction.ProfileAction ) {
  switch(action.type){
      case ProfileAction.UPDATE_SECTION:
          return { ...state, ...action.payload };
      case ProfileAction.RESET_SECTION:
          return {...initialState};
      default:
          return state;
  }  
}
