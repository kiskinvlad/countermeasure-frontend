import { Action } from '@ngrx/store';
import { DisputesActionTypes } from '@app/shared/ngrx-store/constants/disputes';

export class FetchDisputed implements Action {
  readonly type = DisputesActionTypes.FETCH_DISPUTED;
  constructor(public payload: any) {}
}

export class FetchDisputedSuccess implements Action {
  readonly type = DisputesActionTypes.FETCH_DISPUTED_SUCCESS;
  constructor(public payload: any) {}
}

export class FetchDisputedFailure implements Action {
  readonly type = DisputesActionTypes.FETCH_DISPUTED_FAILURE;
  constructor(public payload: any) {}
}

export class FetchDisputesByCase implements Action {
  readonly type = DisputesActionTypes.FETCH_DISPUTES_BY_CASE;
  constructor(public payload: any) {}
}

export class FetchDisputesByCaseSuccess implements Action {
  readonly type = DisputesActionTypes.FETCH_DISPUTES_BY_CASE_SUCCESS;
  constructor(public payload: any) {}
}

export class FetchDisputesByCaseFailure implements Action {
  readonly type = DisputesActionTypes.FETCH_DISPUTES_BY_CASE_FAILURE;
  constructor(public payload: any) {}
}

export class FetchDisputes implements Action {
  readonly type = DisputesActionTypes.FETCH_DISPUTES;
  constructor() {}
}

 export class FetchDisputesSuccess implements Action {
  readonly type = DisputesActionTypes.FETCH_DISPUTES_SUCCESS;
  constructor(public payload: any) {}
}

export class FetchDisputesFailure implements Action {
  readonly type = DisputesActionTypes.FETCH_DISPUTES_FAILURE;
  constructor(public payload: any) {}
}

export class CreateDisputed implements Action {
  readonly type = DisputesActionTypes.CREATE_DISPUTED;
  constructor(public payload: any) {}
}

export class CreateDisputedSuccess implements Action {
  readonly type = DisputesActionTypes.CREATE_DISPUTED_SUCCESS;
  constructor(public payload: any) {}
}

export class CreateDisputedFailure implements Action {
  readonly type = DisputesActionTypes.CREATE_DISPUTED_FAILURE;
  constructor(public payload: any) {}
}

export class UpdateDisputed implements Action {
  readonly type = DisputesActionTypes.UPDATE_DISPUTED;
  constructor(public payload: any) {}
}

export class UpdateDisputedSuccess implements Action {
  readonly type = DisputesActionTypes.UPDATE_DISPUTED_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdateDisputedFailure implements Action {
  readonly type = DisputesActionTypes.UPDATE_DISPUTED_FAILURE;
  constructor(public payload: any) {}
}

export class RemoveDisputed implements Action {
  readonly type = DisputesActionTypes.REMOVE_DISPUTED;
  constructor(public payload: any) {}
}

export class RemoveDisputedSuccess implements Action {
  readonly type = DisputesActionTypes.REMOVE_DISPUTED_SUCCESS;
  constructor(public payload: any) {}
}

export class RemoveDisputedFailure implements Action {
  readonly type = DisputesActionTypes.REMOVE_DISPUTED_FAILURE;
  constructor(public payload: any) {}
}

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
  | FetchDisputes
  | FetchDisputesSuccess
  | FetchDisputesFailure;
