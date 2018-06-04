
import { DisputesActionTypes } from '@app/shared/ngrx-store/constants/disputes';
import { Case } from '@app/shared/models/case';
import { All } from '@app/shared/ngrx-store/actions/disputes.actions';
import { Disputed } from '@app/shared/models/disputed';


export interface State {
  disputes: Disputed[];
  disputed: Disputed;
  errorMessage: string | null;
}

export const initialState: State = {
  disputes: [],
  disputed: null,
  errorMessage: null
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case DisputesActionTypes.FETCH_DISPUTED_SUCCESS: {
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
