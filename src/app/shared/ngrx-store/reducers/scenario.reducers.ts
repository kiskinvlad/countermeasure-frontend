
import { ScenariosActionTypes } from '@app/shared/ngrx-store/constants/scenario';
import { Scenario } from '@app/shared/models/scenario';
import { All } from '@app/shared/ngrx-store/actions/scenario.actions';
/**
 * Scenario state interface
 */
export interface State {
/**
 * State params
 * @param {Scenario} scenario Scenario model
 * @param {Scenario[]} sceneries Scenarios models array param
 * @param {Number} totalCount Total case count param
 * @param {Number} page_number Page number param
 * @param {Number} items_per_page Cases count per page param
 * @param {string | null} errorMessage Error message param
 */
  scenarios: Scenario[];
  scenario: Scenario;
  totalCount: Number;
  page_number: Number;
  items_per_page: Number;
  errorMessage: string | null;
}
/**
 * Initial state
 */
export const initialState: State = {
  scenarios: [],
  scenario: null,
  totalCount: 0,
  page_number: 1,
  items_per_page: 10,
  errorMessage: null
};
/**
 * Scenario state reducer
 * @param {State} state
 * @param {All} action
 */
export function reducer(state: State = initialState, action: All): State {
  console.log('scenario reducer', action.type);
  switch (action.type) {
    case ScenariosActionTypes.FETCH_SCENARIOS_SUCCESS: {
      return {
        ...state,
        scenarios: action.payload.scenarios,
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
        scenarios: action.payload.scenarios,
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
        scenarios: action.payload.scenarios,
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
