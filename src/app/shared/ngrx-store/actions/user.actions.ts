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
  | FetchUsersFailure;
