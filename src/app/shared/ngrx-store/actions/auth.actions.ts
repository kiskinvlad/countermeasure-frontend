import { Action } from '@ngrx/store';
import { User } from '../../models/user';
import { AuthActionTypes } from '../constants/auth';

export { AuthActionTypes }

export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: any) {}
}

export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: User) {}
}

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: object) {}
}

export class LogOut implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class LogOutSuccess implements Action {
  readonly type = AuthActionTypes.LOGOUT_SUCCESS;
}

export class LogOutFailure implements Action {
  readonly type = AuthActionTypes.LOGOUT_FAILURE;
  constructor(public payload: object) {}
}

export class FetchUserData implements Action {
  readonly type = AuthActionTypes.FETCH_USER_DATA;
}

export class FetchUserDataSuccess implements Action {
  readonly type = AuthActionTypes.FETCH_USER_DATA_SUCCESS;
  constructor(public payload: any) {}
}

export class FetchUserDataFailure implements Action {
  readonly type = AuthActionTypes.FETCH_USER_DATA_FAILURE;
  constructor(public payload: object) {}
}

export type All =
  | LogIn
  | LogInSuccess
  | LogInFailure
  | FetchUserData
  | FetchUserDataSuccess
  | FetchUserDataFailure
  | LogOut
  | LogOutSuccess
  | LogOutFailure;

