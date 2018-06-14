import { Action } from '@ngrx/store';
import { PermissionActionTypes } from '@app/shared/ngrx-store/constants/permission';

export class FetchPermissions implements Action {
  readonly type = PermissionActionTypes.FETCH_PERMISSIONS;
  constructor(public payload: any) {}
}

export class FetchPermissionsSuccess implements Action {
  readonly type = PermissionActionTypes.FETCH_PERMISSIONS_SUCCESS;
  constructor(public payload: any) {}
}

export class FetchPermissionsFailure implements Action {
  readonly type = PermissionActionTypes.FETCH_PERMISSIONS_FAILURE;
  constructor(public payload: any) {}
}

export class AddPermissions implements Action {
  readonly type = PermissionActionTypes.ADD_PERMISSIONS;
  constructor(public payload: any) {}
}

export class AddPermissionsSuccess implements Action {
  readonly type = PermissionActionTypes.ADD_PERMISSIONS_SUCCESS;
  constructor(public payload: any) {}
}

export class AddPermissionsFailure implements Action {
  readonly type = PermissionActionTypes.ADD_PERMISSIONS_FAILURE;
  constructor(public payload: any) {}
}

export class DeletePermissions implements Action {
  readonly type = PermissionActionTypes.DELETE_PERMISSIONS;
  constructor(public payload: any) {}
}

export class DeletePermissionsSuccess implements Action {
  readonly type = PermissionActionTypes.DELETE_PERMISSIONS_SUCCESS;
  constructor(public payload: any) {}
}

export class DeletePermissionsFailure implements Action {
  readonly type = PermissionActionTypes.DELETE_PERMISSIONS_FAILURE;
  constructor(public payload: any) {}
}

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
