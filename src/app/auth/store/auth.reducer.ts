import * as AuthAction from './auth.action';

export interface AuthState {
  loggedIn: boolean;
  jwtToken: string;
}

const initialState: AuthState = {
  loggedIn: false,
  jwtToken: '',
};

export function AuthReducer(
  state: AuthState = initialState,
  action: AuthAction.AUTH_ACTIONS
) {
  switch (action.type) {
    case AuthAction.TRY_LOGIN:
      return { ...state, loggedIn: false };
    case AuthAction.LOGIN:
      return { ...state, loggedIn: true, jwtToken: action.payload };
    case AuthAction.LOGOUT:
      return { ...state, loggedIn: false, jwtToken: '' };
  }
  return state;
}
