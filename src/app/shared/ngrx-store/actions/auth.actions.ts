import { Action } from '@ngrx/store';
import { User } from '@app/shared/models/user';
import { AuthActionTypes } from '@app/shared/ngrx-store/constants/auth';
/**
 * Log in action
 * Called when user try to login
 */
export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: any) {}
}
/**
 * Log in success action
 * Called when user login successful
 */
export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: User) {}
}
/**
 * Log in failure action
 * Called when user login failure
 */
export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: object) {}
}
/**
 * Log out action
 * Called when user try to log out
 */
export class LogOut implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}
/**
 * Log out success action
 * Called when user log out successful
 */
export class LogOutSuccess implements Action {
  readonly type = AuthActionTypes.LOGOUT_SUCCESS;
}
/**
 * Log out failure action
 * Called when user log out failure
 */
export class LogOutFailure implements Action {
  readonly type = AuthActionTypes.LOGOUT_FAILURE;
  constructor(public payload: object) {}
}
/**
 * Fetch user data action
 * Called when try to fetch user data
 */
export class FetchUserData implements Action {
  readonly type = AuthActionTypes.FETCH_USER_DATA;
}
/**
 * Fetch user data success action
 * Called when user data fetched successful
 */
export class FetchUserDataSuccess implements Action {
  readonly type = AuthActionTypes.FETCH_USER_DATA_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Fetch user data success action
 * Called when user data fetched failure
 */
export class FetchUserDataFailure implements Action {
  readonly type = AuthActionTypes.FETCH_USER_DATA_FAILURE;
  constructor(public payload: object) {}
}
/**
 * Action types
 * Export action types
 */
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

