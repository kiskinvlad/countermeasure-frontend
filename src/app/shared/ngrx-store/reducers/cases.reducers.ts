import { Case } from '../../models/case';
import { CasesActionTypes, All } from '../actions/cases.actions';


export interface State {
  cases: Case[];
  totalCount: Number;
  page_number: Number;
  items_per_page: Number;
  errorMessage: string | null;
}

export const initialState: State = {
  cases: [],
  totalCount: 0,
  page_number: 1,
  items_per_page: 2,
  errorMessage: null
};

export function reducer(state = initialState, action: All): State {
  console.log("cases reducer", action.type);
  switch (action.type) {
    case CasesActionTypes.FETCH_CASES_SUCCESS: {
      return {
        ...state,
        cases: action.payload.cases,
        page_number: action.payload.page_number,
        totalCount: action.payload.totalCount,
        items_per_page: action.payload.items_per_page,
        errorMessage: null
      };
    }
    case CasesActionTypes.FETCH_CASES_FAILURE: {
      return {
        ...state,
        errorMessage: 'Cannot fetch cases.'
      };
    }
    default: {
      return state;
    }
  }
}
