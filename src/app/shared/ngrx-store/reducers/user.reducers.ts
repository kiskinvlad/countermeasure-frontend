import { User } from '@shared/models/user';
import { UserActionTypes } from '@app/shared/ngrx-store/constants/user';
import { All } from '@app/shared/ngrx-store/actions/user.actions';
import { Permission } from '@shared/models/permission';

export interface State {
  user: User;
  users: User[];
  totalCount: Number;
  totalEnabled: Number;
  errorMessage: string;
  permissions: Permission[];
}

export const initialState: State = {
  user: null,
  users: [],
  totalCount: 0,
  totalEnabled: null,
  errorMessage: null,
  permissions: []
};


const messages = {
  ERR_FAILED_GET_USER: 'Failed to fetch user.',
  ERR_FAILED_UPDATE_USER: 'Failed to update user.',
  ERR_FAILED_UPDATE_PASSWORD: 'Failed to update password.',
  ERR_FAILED_GET_USERS: 'Failed to fetch users.',
  ERR_FAILED_GET_PERMISSIONS: 'Failed to fetch permissions.',
  ERR_FAILED_ADD_PERMISSIONS: 'Failed to add permissions.',
  ERR_FAILED_DELETE_PERMISSIONS: 'Failed to delete permissions.'
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
        user: null,
        errorMessage: messages.ERR_FAILED_GET_USER
      };
    }
    case UserActionTypes.UPDATE_USER_SUCCESS: {
      return {
        ...state,
        user:  action.payload.user,
        errorMessage: null
      };
    }
    case UserActionTypes.UPDATE_USER_FAILURE: {
      let err = action.payload.error;
      if (err._body) {
        err  = JSON.parse(err._body).error;
      }

      return {
        ...state,
        errorMessage: err
      };
    }
    case UserActionTypes.UPDATE_PASSWORD_SUCCESS: {
      return {
        ...state,
        user:  action.payload.user,
        errorMessage: null
      };
    }
    case UserActionTypes.UPDATE_PASSWORD_FAILURE: {
      return {
        ...state,
        errorMessage: messages.ERR_FAILED_UPDATE_PASSWORD
      };
    }
    case UserActionTypes.FETCH_USERS_SUCCESS: {
      return {
        ...state,
        users:  action.payload.users,
        totalCount: action.payload.count,
        totalEnabled: action.payload.total_enabled,
        errorMessage: null
      };
    }
    case UserActionTypes.FETCH_USERS_FAILURE: {
      return {
        ...state,
        users: [],
        totalCount: 0,
        totalEnabled: null,
        errorMessage: messages.ERR_FAILED_GET_USERS
      };
    }
    case UserActionTypes.CREATE_USER_SUCCESS: {
      return {
        ...state,
        user:  action.payload.user,
        errorMessage: null
      };
    }
    case UserActionTypes.CREATE_USER_FAILURE: {
      let err = action.payload.error;
      if (err._body) {
        err  = JSON.parse(err._body).error;
      }

      return {
        ...state,
        errorMessage: err
      };
    }
    case UserActionTypes.FETCH_PERMISSIONS_SUCCESS: {
      return {
        ...state,
        permissions:  action.payload.permissions,
        totalCount: action.payload.count,
        errorMessage: null
      };
    }
    case UserActionTypes.FETCH_PERMISSIONS_FAILURE: {
      return {
        ...state,
        permissions: null,
        totalCount: 0,
        errorMessage: messages.ERR_FAILED_GET_PERMISSIONS
      };
    }
    case UserActionTypes.ADD_PERMISSIONS_SUCCESS: {
      return {
        ...state,
        permissions:  action.payload.permissions,
        totalCount: action.payload.count,
        errorMessage: null
      };
    }
    case UserActionTypes.ADD_PERMISSIONS_FAILURE: {
      return {
        ...state,
        errorMessage: messages.ERR_FAILED_ADD_PERMISSIONS
      };
    }
    case UserActionTypes.DELETE_PERMISSIONS_SUCCESS: {
      return {
        ...state,
        permissions:  action.payload.permissions,
        totalCount: action.payload.count,
        errorMessage: null
      };
    }
    case UserActionTypes.DELETE_PERMISSIONS_FAILURE: {
      return {
        ...state,
        errorMessage: messages.ERR_FAILED_DELETE_PERMISSIONS
      };
    }
    default: {
      return state;
    }
  }
}
