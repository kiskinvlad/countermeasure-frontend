import { User } from '@shared/models/user';
import { UserActionTypes } from '@app/shared/ngrx-store/constants/user';
import { All } from '@app/shared/ngrx-store/actions/user.actions';


export interface State {
  user: User;
  isUserUpdated: boolean;
  errorMessage: string;
}

export const initialState: State = {
  user: null,
  isUserUpdated: false,
  errorMessage: null
};


const messages = {
  ERR_FAILED_GET_USER: 'Failed to fetch user.',
  ERR_FAILED_UPDATE_USER: 'Failed to update user.'
};

export function reducer(state: State = initialState, action: All): State {
  console.log(action.type);
  switch (action.type) {
    case UserActionTypes.FETCH_USER_SUCCESS: {
      return {
        ...state,
        user:  action.payload.user,
        errorMessage: null
      };
    }
    case UserActionTypes.FETCH_USER_FAILURE: {
      return {
        ...state,
        errorMessage: messages.ERR_FAILED_GET_USER
      };
    }
    case UserActionTypes.UPDATE_USER_SUCCESS: {
      return {
        ...state,
        user:  action.payload.user,
        isUserUpdated: true,
        errorMessage: null
      };
    }
    case UserActionTypes.UPDATE_USER_FAILURE: {
      return {
        ...state,
        isUserUpdated: false,
        errorMessage: messages.ERR_FAILED_UPDATE_USER
      };
    }
    default: {
      return state;
    }
  }
}

