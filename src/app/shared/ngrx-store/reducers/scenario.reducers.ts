
import { ScenariosActionTypes } from '@app/shared/ngrx-store/constants/scenario';
import { Scenario } from '@app/shared/models/scenario';
import { All } from '@app/shared/ngrx-store/actions/scenario.actions';


export interface State {
  Scenarios: Scenario[];
  scenario: Scenario;
  totalCount: Number;
  page_number: Number;
  items_per_page: Number;
  errorMessage: string | null;
}

export const initialState: State = {
  Scenarios: [],
  scenario: null,
  totalCount: 0,
  page_number: 1,
  items_per_page: 10,
  errorMessage: null
};

export function reducer(state = initialState, action: All): State {
  console.log('scenario reducer', action.type);
  switch (action.type) {
    case ScenariosActionTypes.FETCH_SCENARIOS_SUCCESS: {
      return {
        ...state,
        Scenarios: action.payload.Scenarios,
        page_number: action.payload.page_number,
        totalCount: action.payload.totalCount,
        items_per_page: action.payload.items_per_page,
        errorMessage: null
      };
    }
    case ScenariosActionTypes.FETCH_SCENARIOS_FAILURE: {
      return {
        ...state,
        errorMessage: 'Cannot fetch Scenarios.'
      };
    }
    case ScenariosActionTypes.MOVE_SCENARIO_SUCCESS: {
      return {
        ...state,
        Scenarios: action.payload.Scenarios,
        page_number: action.payload.page_number,
        totalCount: action.payload.totalCount,
        items_per_page: action.payload.items_per_page,
        errorMessage: null
      };
    }
    case ScenariosActionTypes.MOVE_SCENARIO_FAILURE: {
      return {
        ...state,
        errorMessage: 'Cannot move scenario.',
      };
    }
    case ScenariosActionTypes.DELETE_SCENARIO_FROM_LIST_SUCCESS: {
      return {
        ...state,
        Scenarios: action.payload.Scenarios,
        page_number: action.payload.page_number,
        totalCount: action.payload.totalCount,
        items_per_page: action.payload.items_per_page,
        errorMessage: null
      };
    }
    case ScenariosActionTypes.DELETE_SCENARIO_FROM_LIST_FAILURE: {
      return {
        ...state,
        errorMessage: 'Cannot delete scenario.',
      };
    }
    case ScenariosActionTypes.FETCH_SCENARIO_SUCCESS: {
      return {
        ...state,
        scenario: action.payload.scenario,
        errorMessage: null
      };
    }
    case ScenariosActionTypes.FETCH_SCENARIO_FAILURE: {
      return {
        ...state,
        errorMessage: 'Cannot fetch scenario.',
      };
    }
    case ScenariosActionTypes.DELETE_SCENARIO_SUCCESS: {
      return {
        ...state,
        errorMessage: null
      };
    }
    case ScenariosActionTypes.DELETE_SCENARIO_FAILURE: {
      return {
        ...state,
        errorMessage: 'Cannot delete scenario.',
      };
    }
    case ScenariosActionTypes.CREATE_SCENARIO_SUCCESS: {
      return {
        ...state,
        errorMessage: null
      };
    }
    case ScenariosActionTypes.CREATE_SCENARIO_FAILURE: {
      return {
        ...state,
        errorMessage: 'Cannot delete scenario.',
      };
    }
    case ScenariosActionTypes.UPDATE_SCENARIO_SUCCESS: {
      return {
        ...state,
        errorMessage: null
      };
    }
    case ScenariosActionTypes.UPDATE_SCENARIO_FAILURE: {
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
