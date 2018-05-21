import { Action } from '@ngrx/store';


export enum RoleActionTypes {
  FETCH_ROLE = '[Role] Login',
  FETCH_ROLE_SUCCESS = '[Role] Fetch Role Success',
  FETCH_ROLE_FAILURE = '[Role] Fetch Role Failure'
}

export class FetchRole implements Action {
  readonly type = RoleActionTypes.FETCH_ROLE;
  constructor(public payload: any) {}
}

export class FetchRoleSuccess implements Action {
  readonly type = RoleActionTypes.FETCH_ROLE_SUCCESS;
  constructor(public payload: any) {}
}

export class FetchRoleFailure implements Action {
  readonly type = RoleActionTypes.FETCH_ROLE_FAILURE;
  constructor(public payload: any) {}
}

export type All =
  | FetchRole
  | FetchRoleSuccess
  | FetchRoleFailure;
