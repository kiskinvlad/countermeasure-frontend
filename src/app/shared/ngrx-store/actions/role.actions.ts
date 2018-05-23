import { Action } from '@ngrx/store';
import { RoleActionTypes } from '@app/shared/ngrx-store/constants/role';

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
