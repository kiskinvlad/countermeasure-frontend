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
/**
 * Csv side-effects service. {@link https://github.com/ngrx/effects/blob/master/docs/intro.md Effects}
 */
export class CsvEffects {
/**
 * @param {number} case_id Current case id
 * @param {number} matter_id Case matter id
 * @param {string} type Type of table
 */
  private case_id: number;
  private matter_id: number;
  private type: string;
/**
 * @constructor
 * @param {Actions} actions App ngrx action service
 * @param {CsvService} csvService Comma separated values service
 * @param {Router} router App router service
 * @param {LocalStorageService} localStorageService Local storage service
 * @param {NgxPermissionsService} permissionsService User ermissions service
 * @param {NotificationsService} notificationsService App notification service
 */
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
      this.matter_id = payload.matter_id;
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
      let report_date = '';
      const current_date = new Date();
      const year = current_date.getFullYear();
      const month = current_date.getMonth() + 1;
      const day = current_date.getDate();
      report_date = '' + year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
      saveAs(data, report_date + ' Matter ID ' + this.matter_id + ' ' + this.type + ' Summary.csv');
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
