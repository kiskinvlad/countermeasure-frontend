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

import { DisputesActionTypes } from '@app/shared/ngrx-store/constants/disputes';
import { DisputesService } from '@app/core/services/DisputesService/disputes.service';
import { LocalStorageService } from '@app/core/services/LocalStorageService/local-storage.service';
import {
     FetchDisputed,
     FetchDisputedSuccess,
     FetchDisputedFailure,
     FetchDisputes,
     FetchDisputesSuccess,
     FetchDisputesFailure
    } from '@app/shared/ngrx-store/actions/disputes.actions';

@Injectable()
export class DisputesEffects {

  constructor(
    private actions: Actions,
    private disputesService: DisputesService,
    private router: Router,
    private localStorageService: LocalStorageService,
  ) {}

  @Effect()
  FetchDisputed: Observable<Action> = this.actions
    .ofType(DisputesActionTypes.FETCH_DISPUTED)
    .map((action: FetchDisputed) => action.payload)
    .switchMap(payload => {
      return this.disputesService.getDisputed(payload)
        .map((data) => {
          return new FetchDisputedSuccess(data);
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new FetchDisputedFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  FetchDisputedSuccess: Observable<any> = this.actions.pipe(
    ofType(DisputesActionTypes.FETCH_DISPUTED_SUCCESS),
    tap(({payload: disputed_data}) => {
      console.log('casesData = ', disputed_data);
    })
  );

  @Effect({ dispatch: false })
  FetchDisputedFailure: Observable<any> = this.actions.pipe(
    ofType(DisputesActionTypes.FETCH_DISPUTED_FAILURE)
  );

  @Effect()
  FetchDisputes: Observable<Action> = this.actions
    .ofType(DisputesActionTypes.FETCH_DISPUTES)
    .map((action: FetchDisputes) => action)
    .switchMap(() => {
      return this.disputesService.getDisputes()
        .map((data) => {
          return new FetchDisputesSuccess(data);
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new FetchDisputesFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  FetchDisputesSuccess: Observable<any> = this.actions.pipe(
    ofType(DisputesActionTypes.FETCH_DISPUTES_SUCCESS),
    tap(({payload: disputes_data}) => {
      console.log('disputesData = ', disputes_data);
    })
  );

  @Effect({ dispatch: false })
  FetchDisputesFailure: Observable<any> = this.actions.pipe(
    ofType(DisputesActionTypes.FETCH_DISPUTES_FAILURE)
  );

}
