
import { DisputesActionTypes } from '@app/shared/ngrx-store/constants/disputes';
import { Case } from '@app/shared/models/case';
import { All } from '@app/shared/ngrx-store/actions/disputes.actions';
import { Disputed } from '@app/shared/models/disputed';

/**
 * Taxes state interface
 */
export interface State {
/**
 * State params
 * @param {Disputed[]} disputes Taxes models array param
 * @param {Disputed} disputed Current tax model
 * @param {Disputed[]} summaries Summary taxes models array param
 * @param {string | null} errorMessage Error message param
 */
  disputes: Disputed[];
  disputed: Disputed;
  summaries: Disputed[];
  errorMessage: string | null;
}
/**
 * Initial state
 */
export const initialState: State = {
  disputes: [],
  disputed: null,
  errorMessage: null,
  summaries: []
};
/**
 * Taxes state reducer
 * @param {State} state
 * @param {All} action
 */
export function reducer(state: State = initialState, action: All): State {
  switch (action.type) {
    case DisputesActionTypes.FETCH_DISPUTED_SUCCESS: {
      console.log('------');
      console.log(action.payload.disputed);
      return {
        ...state,
        disputed: action.payload.disputed,
        errorMessage: null
      };
    }
    case DisputesActionTypes.FETCH_DISPUTED_FAILURE: {
      return {
        ...state,
        errorMessage: 'Cannot fetch disputed.'
      };
    }
    case DisputesActionTypes.FETCH_DISPUTES_SUCCESS: {
      return {
        ...state,
        disputes: action.payload.disputes,
        errorMessage: null
      };
    }
    case DisputesActionTypes.FETCH_DISPUTES_FAILURE: {
      return {
        ...state,
        errorMessage: 'Cannot fetch disputes.'
      };
    }
    case DisputesActionTypes.FETCH_DISPUTES_BY_CASE_SUCCESS: {
      return {
        ...state,
        disputes: action.payload.disputes,
        errorMessage: null
      };
    }
    case DisputesActionTypes.FETCH_DISPUTES_BY_CASE_FAILURE: {
      return {
        ...state,
        errorMessage: 'Cannot fetch disputes.'
      };
    }
    case DisputesActionTypes.FETCH_DISPUTES_BY_SUMMARY_SUCCESS: {
      return {
        ...state,
        summaries: action.payload.disputes,
        errorMessage: null
      };
    }
    case DisputesActionTypes.FETCH_DISPUTES_BY_SUMMARY_FAILURE: {
      return {
        ...state,
        errorMessage: 'Cannot fetch disputes.'
      };
    }
    case DisputesActionTypes.CREATE_DISPUTED_SUCCESS: {
      return {
        ...state,
        disputes: action.payload.disputes,
        errorMessage: null
      };
    }
    case DisputesActionTypes.CREATE_DISPUTED_FAILURE: {
      return {
        ...state,
        errorMessage: 'Cannot fetch disputes.'
      };
    }
    case DisputesActionTypes.UPDATE_DISPUTED_SUCCESS: {
      return {
        ...state,
        disputes: action.payload.disputes,
        errorMessage: null
      };
    }
    case DisputesActionTypes.UPDATE_DISPUTED_FAILURE: {
      return {
        ...state,
        errorMessage: 'Cannot fetch disputes.'
      };
    }
    case DisputesActionTypes.REMOVE_DISPUTED_SUCCESS: {
      return {
        ...state,
        disputes: action.payload.disputes,
        errorMessage: null
      };
    }
    case DisputesActionTypes.REMOVE_DISPUTED_FAILURE: {
      return {
        ...state,
        errorMessage: 'Cannot fetch disputes.'
      };
    }
    default: {
      return state;
    }
  }
}
