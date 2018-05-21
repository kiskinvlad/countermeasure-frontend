import { Action } from '@ngrx/store';
import { User } from '@app/login/models/user';


export enum AuthActionTypes {
  LOGIN = '[Auth] Login Action',
  LOGIN_SUCCESS = '[Auth] Login Success Action',
  LOGIN_FAILURE = '[Auth] Login Failure Action',
  LOGOUT = '[Auth] Logout Action',
  LOGOUT_SUCCESS = '[Auth] Logout Success Action',
  LOGOUT_FAILURE = '[Auth] Logout Failure Action',
  FETCH_USER_DATA = '[Auth] Fetch User Data Action',
  FETCH_USER_DATA_SUCCESS = '[Auth] Fetch User Data Success Action',
  FETCH_USER_DATA_FAILURE = '[Auth] Fetch User Data Failure Action'
}

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

