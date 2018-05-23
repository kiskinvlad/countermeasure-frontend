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
import { CasesActionTypes } from '@app/shared/ngrx-store/constants/cases';
import { CasesService } from '@app/core/services/CasesService/cases.service';
import { LocalStorageService } from '@app/core/services/LocalStorageService/local-storage.service';
import { FetchCases, FetchCasesSuccess, FetchCasesFailure } from '@app/shared/ngrx-store/actions/cases.actions';

@Injectable()
export class CasesEffects {

  constructor(
    private actions: Actions,
    private casesService: CasesService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private permissionsService: NgxPermissionsService
  ) {}

  @Effect()
  FetchCases: Observable<Action> = this.actions
    .ofType(CasesActionTypes.FETCH_CASES)
    .map((action: FetchCases) => action.payload)
    .switchMap(payload => {

      return this.casesService.getFilteredAndSorted(payload)
        .map((data) => {
          return new FetchCasesSuccess(data);
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new FetchCasesFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  FetchCasesSuccess: Observable<any> = this.actions.pipe(
    ofType(CasesActionTypes.FETCH_CASES_SUCCESS),
    tap(({payload: casesData}) => {
      console.log('casesData = ', casesData);
    })
  );

  @Effect({ dispatch: false })
  FetchCasesFailure: Observable<any> = this.actions.pipe(
    ofType(CasesActionTypes.FETCH_CASES_FAILURE)
  );

}
