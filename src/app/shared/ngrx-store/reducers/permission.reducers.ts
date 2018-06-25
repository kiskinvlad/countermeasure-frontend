import { PermissionActionTypes } from '@app/shared/ngrx-store/constants/permission';
import { All } from '@app/shared/ngrx-store/actions/permission.actions';
import { Permission } from '@shared/models/permission';
/**
 * Permissions state interface
 */
export interface State {
/**
 * State params
 * @param {Permission[]} permissions Permission models array param
 * @param {number} totalCount Permissions count param
 * @param {string | null} errorMessage Error message param
 */
  totalCount: Number;
  errorMessage: string;
  permissions: Permission[];
}
/**
 * Initial state
 */
export const initialState: State = {
  totalCount: 0,
  errorMessage: null,
  permissions: []
};

const messages = {
  ERR_FAILED_GET_PERMISSIONS: 'Failed to fetch permissions.',
  ERR_FAILED_ADD_PERMISSIONS: 'Failed to add permissions.',
  ERR_FAILED_DELETE_PERMISSIONS: 'Failed to delete permissions.'
};
/**
 * Organizations state reducer
 * @param {State} state
 * @param {All} action
 */
export function reducer(state: State = initialState, action: All): State {
  console.log(action.type);
  switch (action.type) {
    case PermissionActionTypes.FETCH_PERMISSIONS_SUCCESS: {
      return {
        ...state,
        permissions:  action.payload.permissions,
        totalCount: action.payload.count,
        errorMessage: null
      };
    }
    case PermissionActionTypes.FETCH_PERMISSIONS_FAILURE: {
      return {
        ...state,
        permissions: null,
        totalCount: 0,
        errorMessage: messages.ERR_FAILED_GET_PERMISSIONS
      };
    }
    case PermissionActionTypes.ADD_PERMISSIONS_SUCCESS: {
      return {
        ...state,
        errorMessage: null
      };
    }
    case PermissionActionTypes.ADD_PERMISSIONS_FAILURE: {
      return {
        ...state,
        errorMessage: messages.ERR_FAILED_ADD_PERMISSIONS
      };
    }
    case PermissionActionTypes.DELETE_PERMISSIONS_SUCCESS: {
      return {
        ...state,
        errorMessage: null
      };
    }
    case PermissionActionTypes.DELETE_PERMISSIONS_FAILURE: {
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
