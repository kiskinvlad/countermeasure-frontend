import { Organization } from '@shared/models/organization';
import { OrganizationActionTypes } from '@app/shared/ngrx-store/constants/organization';
import { All } from '@app/shared/ngrx-store/actions/organization.actions';
/**
 * Organization state interface
 */
export interface State {
/**
 * State params
 * @param {Organization} organization Organization model
 * @param {Organization[]} organizations Organization models array param
 * @param {number} totalCount Taxes count param
 * @param {string | null} errorMessage Error message param
 */
  organization: Organization;
  organizations: Organization[];
  totalCount: number;
  errorMessage: string;
}
/**
 * Initial state
 */
export const initialState: State = {
  organization: null,
  organizations: [],
  totalCount: 0,
  errorMessage: null
};

const messages = {
  ERR_FAILED_GET_ORGANIZATION: 'Failed to fetch organization.',
  ERR_FAILED_UPDATE_ORGANIZATION: 'Failed to update organization.',
  ERR_FAILED_GET_ORGANIZATIONS: 'Failed to fetch organizations.',
  ERR_FAILED_CREATE_ORGANIZATION: 'Failed to create organization.'
};
/**
 * Organizations state reducer
 * @param {State} state
 * @param {All} action
 */
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
    case OrganizationActionTypes.FETCH_ORGANIZATIONS_SUCCESS: {
      return {
        ...state,
        organizations:  action.payload.organizations,
        totalCount: action.payload.count,
        errorMessage: null
      };
    }
    case OrganizationActionTypes.FETCH_ORGANIZATIONS_FAILURE: {
      return {
        ...state,
        organizations: [],
        totalCount: 0,
        errorMessage: messages.ERR_FAILED_GET_ORGANIZATIONS
      };
    }
    case OrganizationActionTypes.CREATE_ORGANIZATION_SUCCESS: {
      return {
        ...state,
        organization:  action.payload.organization,
        errorMessage: null
      };
    }
    case OrganizationActionTypes.CREATE_ORGANIZATION_FAILURE: {
      return {
        ...state,
        errorMessage: messages.ERR_FAILED_CREATE_ORGANIZATION
      };
    }
    default: {
      return state;
    }
  }
}
