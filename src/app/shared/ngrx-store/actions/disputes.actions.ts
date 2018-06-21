import { Action } from '@ngrx/store';
import { DisputesActionTypes } from '@app/shared/ngrx-store/constants/disputes';
/**
 * Fetch tax data action
 * Called when try to fetch tax data
 */
export class FetchDisputed implements Action {
  readonly type = DisputesActionTypes.FETCH_DISPUTED;
  constructor(public payload: any) {}
}
/**
 * Fetch tax data success action
 * Called when fetch tax data successful
 */
export class FetchDisputedSuccess implements Action {
  readonly type = DisputesActionTypes.FETCH_DISPUTED_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Fetch tax data failure action
 * Called when fetch tax data failure
 */
export class FetchDisputedFailure implements Action {
  readonly type = DisputesActionTypes.FETCH_DISPUTED_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Fetch tax data by case action
 * Called when try to fetch tax data by case
 */
export class FetchDisputesByCase implements Action {
  readonly type = DisputesActionTypes.FETCH_DISPUTES_BY_CASE;
  constructor(public payload: any) {}
}
/**
 * Fetch tax data by case success action
 * Called when fetch tax data by case successful
 */
export class FetchDisputesByCaseSuccess implements Action {
  readonly type = DisputesActionTypes.FETCH_DISPUTES_BY_CASE_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Fetch tax data by case failure action
 * Called when fetch tax data by case failure
 */
export class FetchDisputesByCaseFailure implements Action {
  readonly type = DisputesActionTypes.FETCH_DISPUTES_BY_CASE_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Fetch tax data by summary action
 * Called when try to fetch tax data by summary
 */
export class FetchDisputesBySummary implements Action {
  readonly type = DisputesActionTypes.FETCH_DISPUTES_BY_SUMMARY;
  constructor(public payload: any) {}
}
/**
 * Fetch tax data by summary success action
 * Called when fetch tax data by summary successful
 */
export class FetchDisputesBySummarySuccess implements Action {
  readonly type = DisputesActionTypes.FETCH_DISPUTES_BY_SUMMARY_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Fetch tax data by summary failure action
 * Called when fetch tax data by summary failure
 */
export class FetchDisputesBySummaryFailure implements Action {
  readonly type = DisputesActionTypes.FETCH_DISPUTES_BY_SUMMARY_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Fetch taxes data action
 * Called when try to fetch taxes data
 */
export class FetchDisputes implements Action {
  readonly type = DisputesActionTypes.FETCH_DISPUTES;
  constructor() {}
}
/**
 * Fetch taxes data success action
 * Called when fetch taxes data successful
 */
 export class FetchDisputesSuccess implements Action {
  readonly type = DisputesActionTypes.FETCH_DISPUTES_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Fetch taxes data failure action
 * Called when fetch taxes data failure
 */
export class FetchDisputesFailure implements Action {
  readonly type = DisputesActionTypes.FETCH_DISPUTES_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Create tax action
 * Called when try to create tax
 */
export class CreateDisputed implements Action {
  readonly type = DisputesActionTypes.CREATE_DISPUTED;
  constructor(public payload: any) {}
}
/**
 * Create tax success action
 * Called when create tax data successful
 */
export class CreateDisputedSuccess implements Action {
  readonly type = DisputesActionTypes.CREATE_DISPUTED_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Create tax failure action
 * Called when create tax failure
 */
export class CreateDisputedFailure implements Action {
  readonly type = DisputesActionTypes.CREATE_DISPUTED_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Update tax action
 * Called when try to update tax
 */
export class UpdateDisputed implements Action {
  readonly type = DisputesActionTypes.UPDATE_DISPUTED;
  constructor(public payload: any) {}
}
/**
 * Update tax success action
 * Called when update tax data successful
 */
export class UpdateDisputedSuccess implements Action {
  readonly type = DisputesActionTypes.UPDATE_DISPUTED_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Update tax failure action
 * Called when update tax failure
 */
export class UpdateDisputedFailure implements Action {
  readonly type = DisputesActionTypes.UPDATE_DISPUTED_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Remove tax action
 * Called when try to remove tax
 */
export class RemoveDisputed implements Action {
  readonly type = DisputesActionTypes.REMOVE_DISPUTED;
  constructor(public payload: any) {}
}
/**
 * Remove tax success action
 * Called when remove tax data successful
 */
export class RemoveDisputedSuccess implements Action {
  readonly type = DisputesActionTypes.REMOVE_DISPUTED_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Remove tax failure action
 * Called when remove tax failure
 */
export class RemoveDisputedFailure implements Action {
  readonly type = DisputesActionTypes.REMOVE_DISPUTED_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Action types
 * Export action types
 */
export type All =
  | FetchDisputed
  | FetchDisputedSuccess
  | FetchDisputedFailure
  | CreateDisputed
  | CreateDisputedSuccess
  | CreateDisputedFailure
  | UpdateDisputed
  | UpdateDisputedSuccess
  | UpdateDisputedFailure
  | RemoveDisputed
  | RemoveDisputedSuccess
  | RemoveDisputedFailure
  | FetchDisputesByCase
  | FetchDisputesByCaseSuccess
  | FetchDisputesByCaseFailure
  | FetchDisputesBySummary
  | FetchDisputesBySummarySuccess
  | FetchDisputesBySummaryFailure
  | FetchDisputes
  | FetchDisputesSuccess
  | FetchDisputesFailure;
