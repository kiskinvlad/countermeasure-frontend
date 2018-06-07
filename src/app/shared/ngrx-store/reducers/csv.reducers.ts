import { All } from '@app/shared/ngrx-store/actions/csv.actions';
import { CsvActionTypes } from '@app/shared/ngrx-store/constants/csv';


export interface State {
  errorMessage: string | null;
}

export const initialState: State = {
  errorMessage: null
};

export function reducer(state = initialState, action: All): State {
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
