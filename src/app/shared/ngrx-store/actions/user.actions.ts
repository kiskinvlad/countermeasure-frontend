import { Action } from '@ngrx/store';
import { User } from '@app/shared/models/user';
import { UserActionTypes } from '@app/shared/ngrx-store/constants/user';

export class FetchUser implements Action {
  readonly type = UserActionTypes.FETCH_USER;
  constructor(public payload: any) {}
}

export class FetchUserSuccess implements Action {
  readonly type = UserActionTypes.FETCH_USER_SUCCESS;
  constructor(public payload: any) {}
}

export class FetchUserFailure implements Action {
  readonly type = UserActionTypes.FETCH_USER_FAILURE;
  constructor(public payload: any) {}
}

export class UpdateUser implements Action {
  readonly type = UserActionTypes.UPDATE_USER;
  constructor(public payload: any) {}
}

export class UpdateUserSuccess implements Action {
  readonly type = UserActionTypes.UPDATE_USER_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdateUserFailure implements Action {
  readonly type = UserActionTypes.UPDATE_USER_FAILURE;
  constructor(public payload: any) {}
}

export class UpdatePassword implements Action {
  readonly type = UserActionTypes.UPDATE_PASSWORD;
  constructor(public payload: any) {}
}

export class UpdatePasswordSuccess implements Action {
  readonly type = UserActionTypes.UPDATE_PASSWORD_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdatePasswordFailure implements Action {
  readonly type = UserActionTypes.UPDATE_PASSWORD_FAILURE;
  constructor(public payload: any) {}
}

export class FetchUsers implements Action {
  readonly type = UserActionTypes.FETCH_USERS;
  constructor(public payload: any) {}
}

export class FetchUsersSuccess implements Action {
  readonly type = UserActionTypes.FETCH_USERS_SUCCESS;
  constructor(public payload: any) {}
}

export class FetchUsersFailure implements Action {
  readonly type = UserActionTypes.FETCH_USERS_FAILURE;
  constructor(public payload: any) {}
}

export class CreateUser implements Action {
  readonly type = UserActionTypes.CREATE_USER;
  constructor(public payload: any) {}
}

export class CreateUserSuccess implements Action {
  readonly type = UserActionTypes.CREATE_USER_SUCCESS;
  constructor(public payload: any) {}
}

export class CreateUserFailure implements Action {
  readonly type = UserActionTypes.CREATE_USER_FAILURE;
  constructor(public payload: any) {}
}

export class FetchPermissions implements Action {
  readonly type = UserActionTypes.FETCH_PERMISSIONS;
  constructor(public payload: any) {}
}

export class FetchPermissionsSuccess implements Action {
  readonly type = UserActionTypes.FETCH_PERMISSIONS_SUCCESS;
  constructor(public payload: any) {}
}

export class FetchPermissionsFailure implements Action {
  readonly type = UserActionTypes.FETCH_PERMISSIONS_FAILURE;
  constructor(public payload: any) {}
}

export class AddPermissions implements Action {
  readonly type = UserActionTypes.ADD_PERMISSIONS;
  constructor(public payload: any) {}
}

export class AddPermissionsSuccess implements Action {
  readonly type = UserActionTypes.ADD_PERMISSIONS_SUCCESS;
  constructor(public payload: any) {}
}

export class AddPermissionsFailure implements Action {
  readonly type = UserActionTypes.ADD_PERMISSIONS_FAILURE;
  constructor(public payload: any) {}
}

export class DeletePermissions implements Action {
  readonly type = UserActionTypes.DELETE_PERMISSIONS;
  constructor(public payload: any) {}
}

export class DeletePermissionsSuccess implements Action {
  readonly type = UserActionTypes.DELETE_PERMISSIONS_SUCCESS;
  constructor(public payload: any) {}
}

export class DeletePermissionsFailure implements Action {
  readonly type = UserActionTypes.DELETE_PERMISSIONS_FAILURE;
  constructor(public payload: any) {}
}

export type All =
  | FetchUser
  | FetchUserSuccess
  | FetchUserFailure
  | UpdateUser
  | UpdateUserSuccess
  | UpdateUserFailure
  | UpdatePassword
  | UpdatePasswordSuccess
  | UpdatePasswordFailure
  | FetchUsers
  | FetchUsersSuccess
  | FetchUsersFailure
  | CreateUser
  | CreateUserSuccess
  | CreateUserFailure
  | FetchPermissions
  | FetchPermissionsSuccess
  | FetchPermissionsFailure
  | AddPermissions
  | AddPermissionsSuccess
  | AddPermissionsFailure
  | DeletePermissions
  | DeletePermissionsSuccess
  | DeletePermissionsFailure;
