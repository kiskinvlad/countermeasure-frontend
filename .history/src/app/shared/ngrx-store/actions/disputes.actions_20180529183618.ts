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

export class FetchDisputes implements Action {
  readonly type = DisputesActionTypes.FETCH_DISPUTES;
  constructor(public payload: any) {}
}

 export class FetchDisputesSuccess implements Action {
  readonly type = DisputesActionTypes.FETCH_DISPUTES_SUCCESS;
  constructor(public payload: any) {}
}

export class FetchDisputesFailure implements Action {
  readonly type = DisputesActionTypes.FETCH_DISPUTES_FAILURE;
  constructor(public payload: any) {}
}

export type All =
  | FetchDisputed
  | FetchDisputedSuccess
  | FetchDisputedFailure
  | FetchDisputes
  | FetchDisputesSuccess
  | FetchDisputesFailure;
