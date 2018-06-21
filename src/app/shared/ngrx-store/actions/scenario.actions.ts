import { Action } from '@ngrx/store';
import { SceneriesActionTypes } from '@app/shared/ngrx-store/constants/scenario';
/**
 * Fetch scenaries data action
 * Called when try to fetch scenaries data
 */
export class FetchSceneries implements Action {
  readonly type = SceneriesActionTypes.FETCH_SCENERIES;
  constructor(public payload: any) {}
}
/**
 * Fetch scenaries data success action
 * Called when fetch scenaries data successful
 */
export class FetchSceneriesSuccess implements Action {
  readonly type = SceneriesActionTypes.FETCH_SCENERIES_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Fetch scenaries data failure action
 * Called when fetch scenaries data failure
 */
export class FetchSceneriesFailure implements Action {
  readonly type = SceneriesActionTypes.FETCH_SCENERIES_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Fetch scenario data action
 * Called when try to fetch scenario data
 */
export class FetchScenario implements Action {
  readonly type = SceneriesActionTypes.FETCH_SCENARIO;
  constructor(public payload: any) {}
}
/**
 * Fetch scenario data success action
 * Called when fetch scenario data successful
 */
export class FetchScenarioSuccess implements Action {
  readonly type = SceneriesActionTypes.FETCH_SCENARIO_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Fetch scenario data failure action
 * Called when fetch scenario data failure
 */
export class FetchScenarioFailure implements Action {
  readonly type = SceneriesActionTypes.FETCH_SCENARIO_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Move scenario action
 * Called when try to change scenario position
 */
export class MoveScenario implements Action {
  readonly type = SceneriesActionTypes.MOVE_SCENARIO;
  constructor(public payload: any) {}
}
/**
 * Move scenario success action
 * Called when change scenario position successful
 */
export class MoveScenarioSuccess implements Action {
  readonly type = SceneriesActionTypes.MOVE_SCENARIO_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Move scenario failure action
 * Called when change scenario position failure
 */
export class MoveScenarioFailure implements Action {
  readonly type = SceneriesActionTypes.MOVE_SCENARIO_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Delete scenario from list action
 * Called when try to delete scenario from list
 */
export class DeleteScenarioFromList implements Action {
  readonly type = SceneriesActionTypes.DELETE_SCENARIO_FROM_LIST;
  constructor(public payload: any) {}
}
/**
 * Delete scenario from list success action
 * Called when delete scenario from list successful
 */
export class DeleteScenarioFromListSuccess implements Action {
  readonly type = SceneriesActionTypes.DELETE_SCENARIO_FROM_LIST_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Delete scenario from list failure action
 * Called when delete scenario from list failure
 */
export class DeleteScenarioFromListFailure implements Action {
  readonly type = SceneriesActionTypes.DELETE_SCENARIO_FROM_LIST_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Delete scenario action
 * Called when try to delete scenario
 */
export class DeleteScenario implements Action {
  readonly type = SceneriesActionTypes.DELETE_SCENARIO;
  constructor(public payload: any) {}
}
/**
 * Delete scenario success action
 * Called when delete scenario successful
 */
export class DeleteScenarioSuccess implements Action {
  readonly type = SceneriesActionTypes.DELETE_SCENARIO_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Delete scenario failure action
 * Called when delete scenario failure
 */
export class DeleteScenarioFailure implements Action {
  readonly type = SceneriesActionTypes.DELETE_SCENARIO_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Update scenario action
 * Called when try to update scenario
 */
export class UpdateScenario implements Action {
  readonly type = SceneriesActionTypes.UPDATE_SCENARIO;
  constructor(public payload: any) {}
}
/**
 * Update scenario success action
 * Called when update scenario successful
 */
export class UpdateScenarioSuccess implements Action {
  readonly type = SceneriesActionTypes.UPDATE_SCENARIO_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Update scenario failure action
 * Called when update scenario failure
 */
export class UpdateScenarioFailure implements Action {
  readonly type = SceneriesActionTypes.UPDATE_SCENARIO_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Create scenario action
 * Called when try to create scenario
 */
export class CreateScenario implements Action {
  readonly type = SceneriesActionTypes.CREATE_SCENARIO;
  constructor(public payload: any) {}
}
/**
 * Create scenario success action
 * Called when create scenario successful
 */
export class CreateScenarioSuccess implements Action {
  readonly type = SceneriesActionTypes.CREATE_SCENARIO_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Create scenario failure action
 * Called when create scenario failure
 */
export class CreateScenarioFailure implements Action {
  readonly type = SceneriesActionTypes.CREATE_SCENARIO_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Action types
 * Export action types
 */
export type All =
  | FetchSceneries
  | FetchSceneriesSuccess
  | FetchSceneriesFailure
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
