import { Role } from '@shared/models/role';
import { All } from '@app/shared/ngrx-store/actions/role.actions';
import { RoleActionTypes } from '@app/shared/ngrx-store/constants/role';
/**
 * Role state interface
 */
export interface State {
/**
 * State params
 * @param {Role | null} role Role model
 * @param {string | null} errorMessage Error message param
 */
  role: Role | null;
  // error message
  errorMessage: string | null;
}
/**
 * Initial state
 */
export const initialState: State = {
  role: null,
  errorMessage: null
};
/**
 * Organizations state reducer
 * @param {State} state
 * @param {All} action
 */
export function reducer(state: State = initialState, action: All): State {
  switch (action.type) {
    case RoleActionTypes.FETCH_ROLE_SUCCESS: {
      return {
        ...state,
        role: {
          role_name: action.payload.role
        },
        errorMessage: null
      };
    }
    case RoleActionTypes.FETCH_ROLE_FAILURE: {
      return {
        ...state,
        errorMessage: 'Cannot fetch role.'
      };
    }
    default: {
      return state;
    }
  }
}
