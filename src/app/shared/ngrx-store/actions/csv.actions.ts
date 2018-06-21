import { Action } from '@ngrx/store';
import { CsvActionTypes } from '@app/shared/ngrx-store/constants/csv';
/**
 * Create comma separated values table action
 * Called when try to create comma separated values table
 */
export class CreateCsv implements Action {
  readonly type = CsvActionTypes.CREATE_CSV;
  constructor(public payload: any) {}
}
/**
 * Create comma separated values table success action
 * Called when create comma separated values table successful
 */
export class CreateCsvSuccess implements Action {
  readonly type = CsvActionTypes.CREATE_CSV_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Create comma separated values table failure action
 * Called when create comma separated values table failure
 */
export class CreateCsvFailure implements Action {
  readonly type = CsvActionTypes.CREATE_CSV_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Action types
 * Export action types
 */
export type All =
  | CreateCsv
  | CreateCsvSuccess
  | CreateCsvFailure;
