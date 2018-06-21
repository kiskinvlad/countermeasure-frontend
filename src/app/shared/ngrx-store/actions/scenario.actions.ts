import { Action } from '@ngrx/store';
import { ScenariosActionTypes } from '@app/shared/ngrx-store/constants/scenario';
/**
 * Fetch scenaries data action
 * Called when try to fetch scenaries data
 */
export class FetchScenarios implements Action {
  readonly type = ScenariosActionTypes.FETCH_SCENARIOS;
  constructor(public payload: any) {}
}
/**
 * Fetch scenaries data success action
 * Called when fetch scenaries data successful
 */
export class FetchScenariosSuccess implements Action {
  readonly type = ScenariosActionTypes.FETCH_SCENARIOS_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Fetch scenaries data failure action
 * Called when fetch scenaries data failure
 */
export class FetchScenariosFailure implements Action {
  readonly type = ScenariosActionTypes.FETCH_SCENARIOS_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Fetch scenario data action
 * Called when try to fetch scenario data
 */
export class FetchScenario implements Action {
  readonly type = ScenariosActionTypes.FETCH_SCENARIO;
  constructor(public payload: any) {}
}
/**
 * Fetch scenario data success action
 * Called when fetch scenario data successful
 */
export class FetchScenarioSuccess implements Action {
  readonly type = ScenariosActionTypes.FETCH_SCENARIO_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Fetch scenario data failure action
 * Called when fetch scenario data failure
 */
export class FetchScenarioFailure implements Action {
  readonly type = ScenariosActionTypes.FETCH_SCENARIO_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Move scenario action
 * Called when try to change scenario position
 */
export class MoveScenario implements Action {
  readonly type = ScenariosActionTypes.MOVE_SCENARIO;
  constructor(public payload: any) {}
}
/**
 * Move scenario success action
 * Called when change scenario position successful
 */
export class MoveScenarioSuccess implements Action {
  readonly type = ScenariosActionTypes.MOVE_SCENARIO_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Move scenario failure action
 * Called when change scenario position failure
 */
export class MoveScenarioFailure implements Action {
  readonly type = ScenariosActionTypes.MOVE_SCENARIO_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Delete scenario from list action
 * Called when try to delete scenario from list
 */
export class DeleteScenarioFromList implements Action {
  readonly type = ScenariosActionTypes.DELETE_SCENARIO_FROM_LIST;
  constructor(public payload: any) {}
}
/**
 * Delete scenario from list success action
 * Called when delete scenario from list successful
 */
export class DeleteScenarioFromListSuccess implements Action {
  readonly type = ScenariosActionTypes.DELETE_SCENARIO_FROM_LIST_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Delete scenario from list failure action
 * Called when delete scenario from list failure
 */
export class DeleteScenarioFromListFailure implements Action {
  readonly type = ScenariosActionTypes.DELETE_SCENARIO_FROM_LIST_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Delete scenario action
 * Called when try to delete scenario
 */
export class DeleteScenario implements Action {
  readonly type = ScenariosActionTypes.DELETE_SCENARIO;
  constructor(public payload: any) {}
}
/**
 * Delete scenario success action
 * Called when delete scenario successful
 */
export class DeleteScenarioSuccess implements Action {
  readonly type = ScenariosActionTypes.DELETE_SCENARIO_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Delete scenario failure action
 * Called when delete scenario failure
 */
export class DeleteScenarioFailure implements Action {
  readonly type = ScenariosActionTypes.DELETE_SCENARIO_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Update scenario action
 * Called when try to update scenario
 */
export class UpdateScenario implements Action {
  readonly type = ScenariosActionTypes.UPDATE_SCENARIO;
  constructor(public payload: any) {}
}
/**
 * Update scenario success action
 * Called when update scenario successful
 */
export class UpdateScenarioSuccess implements Action {
  readonly type = ScenariosActionTypes.UPDATE_SCENARIO_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Update scenario failure action
 * Called when update scenario failure
 */
export class UpdateScenarioFailure implements Action {
  readonly type = ScenariosActionTypes.UPDATE_SCENARIO_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Create scenario action
 * Called when try to create scenario
 */
export class CreateScenario implements Action {
  readonly type = ScenariosActionTypes.CREATE_SCENARIO;
  constructor(public payload: any) {}
}
/**
 * Create scenario success action
 * Called when create scenario successful
 */
export class CreateScenarioSuccess implements Action {
  readonly type = ScenariosActionTypes.CREATE_SCENARIO_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Create scenario failure action
 * Called when create scenario failure
 */
export class CreateScenarioFailure implements Action {
  readonly type = ScenariosActionTypes.CREATE_SCENARIO_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Action types
 * Export action types
 */
export type All =
  | FetchScenarios
  | FetchScenariosSuccess
  | FetchScenariosFailure
  | MoveScenario
  | MoveScenarioSuccess
  | MoveScenarioFailure
  | DeleteScenarioFromList
  | DeleteScenarioFromListSuccess
  | DeleteScenarioFromListFailure
  | FetchScenario
  | FetchScenarioSuccess
  | FetchScenarioFailure
  | DeleteScenario
  | DeleteScenarioSuccess
  | DeleteScenarioFailure
  | UpdateScenario
  | UpdateScenarioSuccess
  | UpdateScenarioFailure
  | CreateScenario
  | CreateScenarioSuccess
  | CreateScenarioFailure;
