import { Case } from '../../models/case';
import { All } from '../actions/cases.actions';
import { CasesActionTypes } from '@app/shared/ngrx-store/constants/cases';


export interface State {
  cases: Case[];
  // error message
  errorMessage: string | null;
}

export const initialState: State = {
  cases: [],
  errorMessage: null
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case CasesActionTypes.FETCH_CASES_SUCCESS: {
      return {
        ...state,
        cases: action.payload.cases,
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
