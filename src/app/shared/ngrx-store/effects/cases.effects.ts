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
import { FetchCases, FetchCasesSuccess, FetchCasesFailure,
         CreateCase, CreateCaseSuccess, CreateCaseFailure,
         DeleteCase, DeleteCaseSuccess, DeleteCaseFailure,
         UpdateCase, UpdateCaseSuccess, UpdateCaseFailure,
         GetCase, GetCaseSuccess, GetCaseFailure, } from '@app/shared/ngrx-store/actions/cases.actions';

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

  @Effect()
  CreateCase: Observable<Action> = this.actions
    .ofType(CasesActionTypes.CREATE_CASE)
    .map((action: CreateCase) => action.payload)
    .switchMap(payload => {

      return this.casesService.getCreatedCase(payload)
        .map((data) => {
          return new CreateCaseSuccess(data);
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new CreateCaseFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  CreateCaseSuccess: Observable<any> = this.actions.pipe(
    ofType(CasesActionTypes.CREATE_CASE_SUCCESS),
    tap(({payload: casesData}) => {
      console.log('casesData = ', casesData);
    })
  );

  @Effect({ dispatch: false })
  CreateCaseFailure: Observable<any> = this.actions.pipe(
    ofType(CasesActionTypes.CREATE_CASE_FAILURE)
  );

  @Effect()
  DeleteCase: Observable<Action> = this.actions
    .ofType(CasesActionTypes.DELETE_CASE)
    .map((action: DeleteCase) => action.payload)
    .switchMap(payload => {

      return this.casesService.getDeletedCase(payload)
        .map((data) => {
          return new DeleteCaseSuccess(data);
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new DeleteCaseFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  DeleteCaseSuccess: Observable<any> = this.actions.pipe(
    ofType(CasesActionTypes.DELETE_CASE_SUCCESS),
    tap(({payload: casesData}) => {
      console.log('casesData = ', casesData);
    })
  );

  @Effect({ dispatch: false })
  DeleteCaseFailure: Observable<any> = this.actions.pipe(
    ofType(CasesActionTypes.DELETE_CASE_FAILURE)
  );

  @Effect()
  GetCase: Observable<Action> = this.actions
    .ofType(CasesActionTypes.GET_CASE)
    .map((action: GetCase) => action.payload)
    .switchMap(payload => {

      return this.casesService.getCase(payload)
        .map((data) => {
          return new GetCaseSuccess(data);
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new GetCaseFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  GetCaseSuccess: Observable<any> = this.actions.pipe(
    ofType(CasesActionTypes.GET_CASE_SUCCESS),
    tap(({payload: casesData}) => {
      console.log('casesData = ', casesData);
    })
  );

  @Effect({ dispatch: false })
  GetCaseFailure: Observable<any> = this.actions.pipe(
    ofType(CasesActionTypes.GET_CASE_FAILURE)
  );

  @Effect()
  UpdateCase: Observable<Action> = this.actions
    .ofType(CasesActionTypes.UPDATE_CASE)
    .map((action: UpdateCase) => action.payload)
    .switchMap(payload => {

      return this.casesService.updateCase(payload)
        .map((data) => {
          return new UpdateCaseSuccess(data);
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new UpdateCaseFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  UpdateCaseSuccess: Observable<any> = this.actions.pipe(
    ofType(CasesActionTypes.UPDATE_CASE_SUCCESS),
    tap(({payload: casesData}) => {
      console.log('casesData = ', casesData);
    })
  );

  @Effect({ dispatch: false })
  UpdateCaseFailure: Observable<any> = this.actions.pipe(
    ofType(CasesActionTypes.UPDATE_CASE_FAILURE)
  );

}
