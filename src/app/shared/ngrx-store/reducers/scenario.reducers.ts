
import { SceneriesActionTypes } from '@app/shared/ngrx-store/constants/scenario';
import { Scenario } from '@app/shared/models/scenario';
import { All } from '@app/shared/ngrx-store/actions/scenario.actions';


export interface State {
  sceneries: Scenario[];
  scenario: Scenario;
  totalCount: Number;
  page_number: Number;
  items_per_page: Number;
  errorMessage: string | null;
}

export const initialState: State = {
  sceneries: [],
  scenario: null,
  totalCount: 0,
  page_number: 1,
  items_per_page: 10,
  errorMessage: null
};

export function reducer(state = initialState, action: All): State {
  console.log('scenario reducer', action.type);
  switch (action.type) {
    case SceneriesActionTypes.FETCH_SCENERIES_SUCCESS: {
      return {
        ...state,
        sceneries: action.payload.sceneries,
        page_number: action.payload.page_number,
        totalCount: action.payload.totalCount,
        items_per_page: action.payload.items_per_page,
        errorMessage: null
      };
    }
    case SceneriesActionTypes.FETCH_SCENERIES_FAILURE: {
      return {
        ...state,
        errorMessage: 'Cannot fetch sceneries.'
      };
    }
    case SceneriesActionTypes.MOVE_SCENARIO_SUCCESS: {
      return {
        ...state,
        sceneries: action.payload.sceneries,
        page_number: action.payload.page_number,
        totalCount: action.payload.totalCount,
        items_per_page: action.payload.items_per_page,
        errorMessage: null
      };
    }
    case SceneriesActionTypes.MOVE_SCENARIO_FAILURE: {
      return {
        ...state,
        errorMessage: 'Cannot move category.',
      };
    }
    case SceneriesActionTypes.DELETE_SCENARIO_FROM_LIST_SUCCESS: {
      return {
        ...state,
        sceneries: action.payload.sceneries,
        page_number: action.payload.page_number,
        totalCount: action.payload.totalCount,
        items_per_page: action.payload.items_per_page,
        errorMessage: null
      };
    }
    case SceneriesActionTypes.DELETE_SCENARIO_FROM_LIST_FAILURE: {
      return {
        ...state,
        errorMessage: 'Cannot delete scenario.',
      };
    }
    case SceneriesActionTypes.FETCH_SCENARIO_SUCCESS: {
      return {
        ...state,
        scenario: action.payload.scenario,
        errorMessage: null
      };
    }
    case SceneriesActionTypes.FETCH_SCENARIO_FAILURE: {
      return {
        ...state,
        errorMessage: 'Cannot fetch scenario.',
      };
    }
    case SceneriesActionTypes.DELETE_SCENARIO_SUCCESS: {
      return {
        ...state,
        errorMessage: null
      };
    }
    case SceneriesActionTypes.DELETE_SCENARIO_FAILURE: {
      return {
        ...state,
        errorMessage: 'Cannot delete scenario.',
      };
    }
    case SceneriesActionTypes.CREATE_SCENARIO_SUCCESS: {
      return {
        ...state,
        errorMessage: null
      };
    }
    case SceneriesActionTypes.CREATE_SCENARIO_FAILURE: {
      return {
        ...state,
        errorMessage: 'Cannot delete category.',
      };
    }
    case SceneriesActionTypes.UPDATE_SCENARIO_SUCCESS: {
      return {
        ...state,
        errorMessage: null
      };
    }
    case SceneriesActionTypes.UPDATE_SCENARIO_FAILURE: {
      return {
        ...state,
        errorMessage: 'Cannot delete scenario.',
      };
    }
    default: {
      return state;
    }
  }
}
