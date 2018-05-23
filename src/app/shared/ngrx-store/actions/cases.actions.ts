import { Action } from '@ngrx/store';
import { CasesActionTypes } from '../constants/cases'

export { CasesActionTypes }
export class FetchCases implements Action {
  readonly type = CasesActionTypes.FETCH_CASES;
  constructor(public payload: any) {}
}

export class FetchCasesSuccess implements Action {
  readonly type = CasesActionTypes.FETCH_CASES_SUCCESS;
  constructor(public payload: any) {}
}

export class FetchCasesFailure implements Action {
  readonly type = CasesActionTypes.FETCH_CASES_FAILURE;
  constructor(public payload: any) {}
}

export type All =
  | FetchCases
  | FetchCasesSuccess
  | FetchCasesFailure;
