import { Role } from '@login/models/role';
import { RoleActionTypes, All } from '../actions/role.actions';


export interface State {
  role: Role | null;
  // error message
  errorMessage: string | null;
}

export const initialState: State = {
  role: null,
  errorMessage: null
};

export function reducer(state = initialState, action: All): State {
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
