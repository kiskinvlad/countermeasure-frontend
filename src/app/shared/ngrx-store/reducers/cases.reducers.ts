
import { CasesActionTypes } from '@app/shared/ngrx-store/constants/cases';
import { Case } from '@app/shared/models/case';
import { All } from '@app/shared/ngrx-store/actions/cases.actions';
/**
 * Cases state interface
 */
export interface State {
/**
 * State params
 * @param {Case[]} cases Cases models array state
 * @param {Number} totalCount Total case count param
 * @param {Number} page_number Page number param
 * @param {Number} items_per_page Cases count per page param
 * @param {String} role_id User role id param
 * @param {String} matter_id Metter id param
 * @param {Number} case_id Current case id param
 * @param {String} name Case name param
 * @param {String} description Case description param
 * @param {string | null} errorMessage Error message param
 */
  cases: Case[];
  totalCount: Number;
  page_number: Number;
  items_per_page: Number;
  role_id: String;
  matter_id: Number;
  case_id: Number;
  name: String;
  description: String;
  errorMessage: string | null;
}
/**
 * Initial state
 */
export const initialState: State = {
  cases: [],
  totalCount: 0,
  page_number: 1,
  items_per_page: 2,
  case_id: undefined,
  role_id: undefined,
  matter_id: undefined,
  name: '',
  description: '',
  errorMessage: null
};
/**
 * Cases state reducer
 * @param {State} state
 * @param {All} action
 */
export function reducer(state: State = initialState, action: All): State {
  switch (action.type) {
    case CasesActionTypes.FETCH_CASES_SUCCESS: {
      return {
        ...state,
        cases: action.payload.cases,
        page_number: action.payload.page_number,
        totalCount: action.payload.totalCount,
        items_per_page: action.payload.items_per_page,
        role_id: action.payload.role_id,
        errorMessage: null
      };
    }
    case CasesActionTypes.FETCH_CASES_FAILURE: {
      return {
        ...state,
        errorMessage: 'Cannot fetch cases.'
      };
    }
    case CasesActionTypes.CREATE_CASE_SUCCESS: {
      return {
        ...state,
        cases: action.payload.cases,
        page_number: action.payload.page_number,
        totalCount: action.payload.totalCount,
        items_per_page: action.payload.items_per_page,
        role_id: action.payload.role_id,
        errorMessage: null
      };
    }
    case CasesActionTypes.CREATE_CASE_FAILURE: {
      return {
        ...state,
        errorMessage: 'Cannot create case.'
      };
    }
    case CasesActionTypes.DELETE_CASE_SUCCESS: {
      return {
        ...state,
        cases: action.payload.cases,
        page_number: action.payload.page_number,
        totalCount: action.payload.totalCount,
        items_per_page: action.payload.items_per_page,
        role_id: action.payload.role_id,
        errorMessage: null
      };
    }
    case CasesActionTypes.DELETE_CASE_FAILURE: {
      return {
        ...state,
        errorMessage: 'Cannot create case.'
      };
    }
    case CasesActionTypes.GET_CASE_SUCCESS: {
      return {
        ...state,
        matter_id: action.payload.matter_id,
        name: action.payload.name,
        description: action.payload.description,
        errorMessage: null
      };
    }
    case CasesActionTypes.GET_CASE_FAILURE: {
      return {
        ...state,
        errorMessage: 'Cannot get case.'
      };
    }
    case CasesActionTypes.UPDATE_CASE_SUCCESS: {
      return {
        ...state,
        matter_id: action.payload.matter_id,
        name: action.payload.name,
        description: action.payload.description,
        errorMessage: null
      };
    }
    case CasesActionTypes.UPDATE_CASE_FAILURE: {
      return {
        ...state,
        errorMessage: 'Cannot update case.'
      };
    }
    default: {
      return state;
    }
  }
}
