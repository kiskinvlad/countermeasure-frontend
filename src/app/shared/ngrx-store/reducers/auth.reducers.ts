import { User } from '@shared/models/user';
import { AuthActionTypes } from '@app/shared/ngrx-store/constants/auth';
import { All } from '@app/shared/ngrx-store/actions/auth.actions';


export interface State {
  isAuthenticated: boolean;
  user: User;
  errorMessage: string;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
};

const messages = {
  ERR_INCORRECT_EMAIL_OR_PASSWORD: 'Incorrect email and/or password.',
  ERR_CANNOT_GET_USER: 'Failed fetch user from local storage.',
  ERR_FAILED_LOGOUT: 'Failed logout user.'
};

export function reducer(state: State = initialState, action: All): State {
  console.log(action.type);
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          email: action.payload.email,
          role_name: action.payload.role_name
        },
        errorMessage: null
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: messages.ERR_INCORRECT_EMAIL_OR_PASSWORD
      };
    }
    case AuthActionTypes.FETCH_USER_DATA_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          email: action.payload.email,
          role_name: action.payload.role_name
        },
        errorMessage: null
      };
    }
    case AuthActionTypes.FETCH_USER_DATA_FAILURE: {
      return {
        ...state,
        errorMessage: messages.ERR_CANNOT_GET_USER
      };
    }
    case AuthActionTypes.LOGOUT: {
      return {
        ...state,
      };
    }
    case AuthActionTypes.LOGOUT_SUCCESS: {
      return initialState;
    }
    case AuthActionTypes.LOGOUT_FAILURE: {
      return {
        ...state,
        errorMessage: messages.ERR_FAILED_LOGOUT
      };
    }
    default: {
      return state;
    }
  }
}

