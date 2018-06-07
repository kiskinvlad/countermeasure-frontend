import { Action } from '@ngrx/store';
import { CsvActionTypes } from '@app/shared/ngrx-store/constants/csv';

export class CreateCsv implements Action {
  readonly type = CsvActionTypes.CREATE_CSV;
  constructor(public payload: any) {}
}

export class CreateCsvSuccess implements Action {
  readonly type = CsvActionTypes.CREATE_CSV_SUCCESS;
  constructor(public payload: any) {}
}

export class CreateCsvFailure implements Action {
  readonly type = CsvActionTypes.CREATE_CSV_FAILURE;
  constructor(public payload: any) {}
}

export type All =
  | CreateCsv
  | CreateCsvSuccess
  | CreateCsvFailure;
