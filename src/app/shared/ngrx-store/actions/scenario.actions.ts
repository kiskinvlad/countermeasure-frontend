import { Action } from '@ngrx/store';
import { ScenariosActionTypes } from '@app/shared/ngrx-store/constants/scenario';

export class FetchScenarios implements Action {
  readonly type = ScenariosActionTypes.FETCH_SCENARIOS;
  constructor(public payload: any) {}
}

export class FetchScenariosSuccess implements Action {
  readonly type = ScenariosActionTypes.FETCH_SCENARIOS_SUCCESS;
  constructor(public payload: any) {}
}

export class FetchScenariosFailure implements Action {
  readonly type = ScenariosActionTypes.FETCH_SCENARIOS_FAILURE;
  constructor(public payload: any) {}
}

export class FetchScenario implements Action {
  readonly type = ScenariosActionTypes.FETCH_SCENARIO;
  constructor(public payload: any) {}
}

export class FetchScenarioSuccess implements Action {
  readonly type = ScenariosActionTypes.FETCH_SCENARIO_SUCCESS;
  constructor(public payload: any) {}
}

export class FetchScenarioFailure implements Action {
  readonly type = ScenariosActionTypes.FETCH_SCENARIO_FAILURE;
  constructor(public payload: any) {}
}

export class MoveScenario implements Action {
  readonly type = ScenariosActionTypes.MOVE_SCENARIO;
  constructor(public payload: any) {}
}

export class MoveScenarioSuccess implements Action {
  readonly type = ScenariosActionTypes.MOVE_SCENARIO_SUCCESS;
  constructor(public payload: any) {}
}

export class MoveScenarioFailure implements Action {
  readonly type = ScenariosActionTypes.MOVE_SCENARIO_FAILURE;
  constructor(public payload: any) {}
}

export class DeleteScenarioFromList implements Action {
  readonly type = ScenariosActionTypes.DELETE_SCENARIO_FROM_LIST;
  constructor(public payload: any) {}
}

export class DeleteScenarioFromListSuccess implements Action {
  readonly type = ScenariosActionTypes.DELETE_SCENARIO_FROM_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class DeleteScenarioFromListFailure implements Action {
  readonly type = ScenariosActionTypes.DELETE_SCENARIO_FROM_LIST_FAILURE;
  constructor(public payload: any) {}
}

export class DeleteScenario implements Action {
  readonly type = ScenariosActionTypes.DELETE_SCENARIO;
  constructor(public payload: any) {}
}

export class DeleteScenarioSuccess implements Action {
  readonly type = ScenariosActionTypes.DELETE_SCENARIO_SUCCESS;
  constructor(public payload: any) {}
}

export class DeleteScenarioFailure implements Action {
  readonly type = ScenariosActionTypes.DELETE_SCENARIO_FAILURE;
  constructor(public payload: any) {}
}

export class UpdateScenario implements Action {
  readonly type = ScenariosActionTypes.UPDATE_SCENARIO;
  constructor(public payload: any) {}
}

export class UpdateScenarioSuccess implements Action {
  readonly type = ScenariosActionTypes.UPDATE_SCENARIO_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdateScenarioFailure implements Action {
  readonly type = ScenariosActionTypes.UPDATE_SCENARIO_FAILURE;
  constructor(public payload: any) {}
}

export class CreateScenario implements Action {
  readonly type = ScenariosActionTypes.CREATE_SCENARIO;
  constructor(public payload: any) {}
}

export class CreateScenarioSuccess implements Action {
  readonly type = ScenariosActionTypes.CREATE_SCENARIO_SUCCESS;
  constructor(public payload: any) {}
}

export class CreateScenarioFailure implements Action {
  readonly type = ScenariosActionTypes.CREATE_SCENARIO_FAILURE;
  constructor(public payload: any) {}
}

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
