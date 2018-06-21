/**
 * Cases action types enumeration.
 */
export enum CasesActionTypes {
    FETCH_CASES = '[Cases] Fetch Cases Action',
    FETCH_CASES_SUCCESS = '[Cases] Fetch Cases Success Action',
    FETCH_CASES_FAILURE = '[Cases] Fetch Cases Failure Action',

    CREATE_CASE = '[Cases] Create Case Action',
    CREATE_CASE_SUCCESS = '[Cases] Create Case Success Action',
    CREATE_CASE_FAILURE = '[Cases] Create Case Failure Action',

    DELETE_CASE = '[Cases] Delete Case Action',
    DELETE_CASE_SUCCESS = '[Cases] Delete Case Success Action',
    DELETE_CASE_FAILURE = '[Cases] Delete Case Failure Action',

    GET_CASE = '[Cases] Get Case Action',
    GET_CASE_SUCCESS = '[Cases] Get Case Success Action',
    GET_CASE_FAILURE = '[Cases] Get Case Failure Action',

    UPDATE_CASE = '[Cases] Update Case Action',
    UPDATE_CASE_SUCCESS = '[Cases] Update Case Success Action',
    UPDATE_CASE_FAILURE = '[Cases] Update Case Failure Action'
}
