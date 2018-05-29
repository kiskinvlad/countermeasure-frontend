import { Action } from '@ngrx/store';
import { CasesActionTypes } from '@app/shared/ngrx-store/constants/cases';

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

export class CreateCase implements Action {
  readonly type = CasesActionTypes.CREATE_CASE;
  constructor(public payload: any) {}
}

export class CreateCaseSuccess implements Action {
  readonly type = CasesActionTypes.CREATE_CASE_SUCCESS;
  constructor(public payload: any) {}
}

export class CreateCaseFailure implements Action {
  readonly type = CasesActionTypes.CREATE_CASE_FAILURE;
  constructor(public payload: any) {}
}

export type All =
  | FetchCases
  | FetchCasesSuccess
  | FetchCasesFailure
  | CreateCase
  | CreateCaseSuccess
  | CreateCaseFailure;
