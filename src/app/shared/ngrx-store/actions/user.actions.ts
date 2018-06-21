import { Action } from '@ngrx/store';
import { User } from '@app/shared/models/user';
import { UserActionTypes } from '@app/shared/ngrx-store/constants/user';
/**
 * Fetch user data action
 * Called when try to fetch user data
 */
export class FetchUser implements Action {
  readonly type = UserActionTypes.FETCH_USER;
  constructor(public payload: any) {}
}
/**
 * Fetch user data success action
 * Called when fetch user data successful
 */
export class FetchUserSuccess implements Action {
  readonly type = UserActionTypes.FETCH_USER_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Fetch user data failure action
 * Called when fetch user data failure
 */
export class FetchUserFailure implements Action {
  readonly type = UserActionTypes.FETCH_USER_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Update user action
 * Called when try to update user
 */
export class UpdateUser implements Action {
  readonly type = UserActionTypes.UPDATE_USER;
  constructor(public payload: any) {}
}
/**
 * Update user success action
 * Called when update user successful
 */
export class UpdateUserSuccess implements Action {
  readonly type = UserActionTypes.UPDATE_USER_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Update user failure action
 * Called when update user failure
 */
export class UpdateUserFailure implements Action {
  readonly type = UserActionTypes.UPDATE_USER_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Update user password action
 * Called when try to update user password
 */
export class UpdatePassword implements Action {
  readonly type = UserActionTypes.UPDATE_PASSWORD;
  constructor(public payload: any) {}
}
/**
 * Update user password success action
 * Called when update user password successful
 */
export class UpdatePasswordSuccess implements Action {
  readonly type = UserActionTypes.UPDATE_PASSWORD_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Update user password failure action
 * Called when update user password failure
 */
export class UpdatePasswordFailure implements Action {
  readonly type = UserActionTypes.UPDATE_PASSWORD_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Fetch users data action
 * Called when try to fetch users data
 */
export class FetchUsers implements Action {
  readonly type = UserActionTypes.FETCH_USERS;
  constructor(public payload: any) {}
}
/**
 * Fetch users data success action
 * Called when fetch users data successful
 */
export class FetchUsersSuccess implements Action {
  readonly type = UserActionTypes.FETCH_USERS_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Fetch users data failure action
 * Called when fetch users data failure
 */
export class FetchUsersFailure implements Action {
  readonly type = UserActionTypes.FETCH_USERS_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Create user action
 * Called when try to create user
 */
export class CreateUser implements Action {
  readonly type = UserActionTypes.CREATE_USER;
  constructor(public payload: any) {}
}
/**
 * Create user success action
 * Called when create user succesfull
 */
export class CreateUserSuccess implements Action {
  readonly type = UserActionTypes.CREATE_USER_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Create user failure action
 * Called when create user failure
 */
export class CreateUserFailure implements Action {
  readonly type = UserActionTypes.CREATE_USER_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Action types
 * Export action types
 */
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
  | CreateUserFailure;
