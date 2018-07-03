import { All } from '@app/shared/ngrx-store/actions/csv.actions';
import { CsvActionTypes } from '@app/shared/ngrx-store/constants/csv';
/**
 * Csv state interface
 */
export interface State {
  errorMessage: string | null;
  data: string | null;
  matter_id: number | undefined;
}
/**
 * Initial state
 */
export const initialState: State = {
  /**
   * @param {string | null} errorMessage Error message param
   */
  data: null,
  matter_id: undefined,
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
      console.log(action.payload)
      return {
        ...state,
        matter_id: action.payload.matter_id,
        data: action.payload.data,
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
