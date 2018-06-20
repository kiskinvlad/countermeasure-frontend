/**
 * Authentication action types enumeration.
 */
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
