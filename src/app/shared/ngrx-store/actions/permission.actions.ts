import { Action } from '@ngrx/store';
import { PermissionActionTypes } from '@app/shared/ngrx-store/constants/permission';
/**
 * Fetch permissions data action
 * Called when try to fetch permissions data
 */
export class FetchPermissions implements Action {
  readonly type = PermissionActionTypes.FETCH_PERMISSIONS;
  constructor(public payload: any) {}
}
/**
 * Fetch permissions data success action
 * Called when fetch permissions data successful
 */
export class FetchPermissionsSuccess implements Action {
  readonly type = PermissionActionTypes.FETCH_PERMISSIONS_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Fetch permissions data failure action
 * Called when try to fetch permissions data failure
 */
export class FetchPermissionsFailure implements Action {
  readonly type = PermissionActionTypes.FETCH_PERMISSIONS_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Add permissions action
 * Called when try to add permissions
 */
export class AddPermissions implements Action {
  readonly type = PermissionActionTypes.ADD_PERMISSIONS;
  constructor(public payload: any) {}
}
/**
 * Add permissions success action
 * Called when add permissions successful
 */
export class AddPermissionsSuccess implements Action {
  readonly type = PermissionActionTypes.ADD_PERMISSIONS_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Add permissions failure action
 * Called when add permissions failure
 */
export class AddPermissionsFailure implements Action {
  readonly type = PermissionActionTypes.ADD_PERMISSIONS_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Delete permissions action
 * Called when try to delete permissions
 */
export class DeletePermissions implements Action {
  readonly type = PermissionActionTypes.DELETE_PERMISSIONS;
  constructor(public payload: any) {}
}
/**
 * Delete permissions success action
 * Called when delete permissions successful
 */
export class DeletePermissionsSuccess implements Action {
  readonly type = PermissionActionTypes.DELETE_PERMISSIONS_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Delete permissions action
 * Called when delete permissions failure
 */
export class DeletePermissionsFailure implements Action {
  readonly type = PermissionActionTypes.DELETE_PERMISSIONS_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Action types
 * Export action types
 */
export type All =
  | FetchPermissions
  | FetchPermissionsSuccess
  | FetchPermissionsFailure
  | AddPermissions
  | AddPermissionsSuccess
  | AddPermissionsFailure
  | DeletePermissions
  | DeletePermissionsSuccess
  | DeletePermissionsFailure;
