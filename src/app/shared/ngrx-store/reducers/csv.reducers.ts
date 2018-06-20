import { All } from '@app/shared/ngrx-store/actions/csv.actions';
import { CsvActionTypes } from '@app/shared/ngrx-store/constants/csv';
/**
 * Csv state interface
 */
export interface State {
  errorMessage: string | null;
}
/**
 * Initial state
 */
export const initialState: State = {
  /**
   * @param {string | null} errorMessage Error message param
   */
  errorMessage: null
};
/**
 * Comma separated values state reducer
 * @param {State} state
 * @param {All} action
 */
export function reducer(state: State = initialState, action: All): State {
  switch (action.type) {
    case CsvActionTypes.CREATE_CSV_SUCCESS: {
      return {
        ...state,
        errorMessage: null
      };
    }
    case CsvActionTypes.CREATE_CSV_FAILURE: {
      return {
        ...state,
        errorMessage: 'Cannot create csv.'
      };
    }
    default: {
      return state;
    }
  }
}
