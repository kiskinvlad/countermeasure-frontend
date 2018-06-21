import { Action } from '@ngrx/store';
import { RoleActionTypes } from '@app/shared/ngrx-store/constants/role';
/**
 * Fetch role data action
 * Called when try to fetch role data
 */
export class FetchRole implements Action {
  readonly type = RoleActionTypes.FETCH_ROLE;
  constructor(public payload: any) {}
}
/**
 * Fetch role data success action
 * Called when role data fetched successful
 */
export class FetchRoleSuccess implements Action {
  readonly type = RoleActionTypes.FETCH_ROLE_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Fetch role data failure action
 * Called when role data fetched failure
 */
export class FetchRoleFailure implements Action {
  readonly type = RoleActionTypes.FETCH_ROLE_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Action types
 * Export action types
 */
export type All =
  | FetchRole
  | FetchRoleSuccess
  | FetchRoleFailure;
