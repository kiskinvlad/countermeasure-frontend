import { Action } from '@ngrx/store';
import { CasesActionTypes } from '@app/shared/ngrx-store/constants/cases';
/**
 * Fetch cases data action
 * Called when try to fetch cases data
 */
export class FetchCases implements Action {
  readonly type = CasesActionTypes.FETCH_CASES;
  constructor(public payload: any) {}
}
/**
 * Fetch cases data success action
 * Called when cases data fetched successful
 */
export class FetchCasesSuccess implements Action {
  readonly type = CasesActionTypes.FETCH_CASES_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Fetch cases data failure action
 * Called when cases data fetched failure
 */
export class FetchCasesFailure implements Action {
  readonly type = CasesActionTypes.FETCH_CASES_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Create case action
 * Called when try to create case
 */
export class CreateCase implements Action {
  readonly type = CasesActionTypes.CREATE_CASE;
  constructor(public payload: any) {}
}
/**
 * Create case success action
 * Called when case created successful
 */
export class CreateCaseSuccess implements Action {
  readonly type = CasesActionTypes.CREATE_CASE_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Create case failure action
 * Called when case created failure
 */
export class CreateCaseFailure implements Action {
  readonly type = CasesActionTypes.CREATE_CASE_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Delete case action
 * Called when try to delete case
 */
export class DeleteCase implements Action {
  readonly type = CasesActionTypes.DELETE_CASE;
  constructor(public payload: any) {}
}
/**
 * Delete case success action
 * Called when case deleted successful
 */
export class DeleteCaseSuccess implements Action {
  readonly type = CasesActionTypes.DELETE_CASE_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Delete case failure action
 * Called when case deleted failure
 */
export class DeleteCaseFailure implements Action {
  readonly type = CasesActionTypes.DELETE_CASE_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Get case data action
 * Called when try to get case
 */
export class GetCase implements Action {
  readonly type = CasesActionTypes.GET_CASE;
  constructor(public payload: any) {}
}
/**
 * Get case data success action
 * Called when case data fetched successful
 */
export class GetCaseSuccess implements Action {
  readonly type = CasesActionTypes.GET_CASE_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Get case data failure action
 * Called when case data fetched failure
 */
export class GetCaseFailure implements Action {
  readonly type = CasesActionTypes.GET_CASE_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Update case data action
 * Called when try to update case
 */
export class UpdateCase implements Action {
  readonly type = CasesActionTypes.UPDATE_CASE;
  constructor(public payload: any) {}
}
/**
 * Update case data success action
 * Called when case data updated successful
 */
export class UpdateCaseSuccess implements Action {
  readonly type = CasesActionTypes.UPDATE_CASE_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Update case data failure action
 * Called when case data updated failure
 */
export class UpdateCaseFailure implements Action {
  readonly type = CasesActionTypes.UPDATE_CASE_FAILURE;
  constructor(public payload: any) {}
}

/**
 * Action types
 * Export action types
 */
export type All =
  | FetchCases
  | FetchCasesSuccess
  | FetchCasesFailure
  | CreateCase
  | CreateCaseSuccess
  | CreateCaseFailure
  | DeleteCase
  | DeleteCaseSuccess
  | DeleteCaseFailure
  | GetCase
  | GetCaseSuccess
  | GetCaseFailure
  | UpdateCase
  | UpdateCaseSuccess
  | UpdateCaseFailure;
