import { Organization } from '@shared/models/organization';
import { OrganizationActionTypes } from '@app/shared/ngrx-store/constants/organization';
import { All } from '@app/shared/ngrx-store/actions/organization.actions';

export interface State {
  organization: Organization;
  errorMessage: string;
}

export const initialState: State = {
  organization: null,
  errorMessage: null
};

const messages = {
  ERR_FAILED_GET_ORGANIZATION: 'Failed to fetch organization.',
  ERR_FAILED_UPDATE_ORGANIZATION: 'Failed to update organization.'
};

export function reducer(state: State = initialState, action: All): State {
  console.log(action.type);
  switch (action.type) {
    case OrganizationActionTypes.FETCH_ORGANIZATION_SUCCESS: {
      return {
        ...state,
        organization:  action.payload.organization,
        errorMessage: null
      };
    }
    case OrganizationActionTypes.FETCH_ORGANIZATION_FAILURE: {
      return {
        ...state,
        errorMessage: messages.ERR_FAILED_GET_ORGANIZATION
      };
    }
    case OrganizationActionTypes.UPDATE_ORGANIZATION_SUCCESS: {
      return {
        ...state,
        organization:  action.payload.organization,
        errorMessage: null
      };
    }
    case OrganizationActionTypes.UPDATE_ORGANIZATION_FAILURE: {
      return {
        ...state,
        errorMessage: messages.ERR_FAILED_UPDATE_ORGANIZATION
      };
    }
    default: {
      return state;
    }
  }
}
