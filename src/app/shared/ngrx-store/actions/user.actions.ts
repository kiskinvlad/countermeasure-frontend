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

export type All =
  | FetchUser
  | FetchUserSuccess
  | FetchUserFailure
  | UpdateUser
  | UpdateUserSuccess
  | UpdateUserFailure;

