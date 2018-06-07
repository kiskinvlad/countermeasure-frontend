import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable } from 'rxjs';
import { map, filter, scan, tap, concatMap } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/observable/from';
import { NgxPermissionsService } from 'ngx-permissions';
import { LocalStorageService } from '@app/core/services/LocalStorageService/local-storage.service';
import { NotificationsService } from 'angular2-notifications';
import { saveAs } from 'file-saver';

import { CreateCsv, CreateCsvSuccess, CreateCsvFailure } from '../actions/csv.actions';
import { CsvActionTypes } from '@app/shared/ngrx-store/constants/csv';
import { CsvService } from '@app/core/services/CsvService/csv.service';

@Injectable()
export class CsvEffects {

private case_id: number;
private type: string;

  constructor(
    private actions: Actions,
    private csvService: CsvService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private permissionsService: NgxPermissionsService,
    private notificationsService: NotificationsService
  ) {}

  @Effect()
  CreateCsv: Observable<Action> = this.actions
    .ofType(CsvActionTypes.CREATE_CSV)
    .map((action: CreateCsv) => action.payload)
    .switchMap(payload => {
      this.case_id = payload.case_id;
      this.type = payload.type;
      return this.csvService.createCsv(payload.json)
        .map((data) => {
          const csv = new Blob([data], { type: 'text/csv' });
          return new CreateCsvSuccess(csv);
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new CreateCsvFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  CreateCsvSuccess: Observable<any> = this.actions.pipe(
    ofType(CsvActionTypes.CREATE_CSV_SUCCESS),
    tap(({payload: data}) => {
      saveAs(data, 'Case_' + this.case_id + '_' + this.type + '_summary.csv');
      this.notificationsService.success('Successful', 'Download started');
    })
  );

  @Effect({ dispatch: false })
  CreateCsvFailure: Observable<any> = this.actions.pipe(
    ofType(CsvActionTypes.CREATE_CSV_FAILURE),
    tap(() => {
      this.notificationsService.error('Failure', 'Download failed');
    })
  );
}
