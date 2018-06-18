import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, filter, scan, tap, concatMap } from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';

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
  CreateDisputed, CreateDisputedSuccess, CreateDisputedFailure,
  UpdateDisputed, UpdateDisputedSuccess, UpdateDisputedFailure,
  RemoveDisputed, RemoveDisputedSuccess, RemoveDisputedFailure,
  FetchDisputed, FetchDisputedSuccess, FetchDisputedFailure,
  FetchDisputes, FetchDisputesSuccess, FetchDisputesFailure,
  FetchDisputesByCase, FetchDisputesByCaseSuccess, FetchDisputesByCaseFailure,
  FetchDisputesBySummary, FetchDisputesBySummarySuccess,
  FetchDisputesBySummaryFailure} from '@app/shared/ngrx-store/actions/disputes.actions';

@Injectable()
export class DisputesEffects {

  constructor(
    private actions: Actions,
    private disputesService: DisputesService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private notificationsService: NotificationsService
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
  CreateDisputed: Observable<Action> = this.actions
    .ofType(DisputesActionTypes.CREATE_DISPUTED)
    .map((action: CreateDisputed) => action.payload)
    .switchMap(payload => {
      return this.disputesService.createDisputed(payload)
        .map((data) => {
          return new CreateDisputedSuccess(data);
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new CreateDisputedFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  CreateDisputedSuccess: Observable<any> = this.actions.pipe(
    ofType(DisputesActionTypes.CREATE_DISPUTED_SUCCESS),
    tap(({payload: disputed_data}) => {
      this.notificationsService.success('Success', 'Disputed has been successfully created.');
    })
  );

  @Effect({ dispatch: false })
  CreateDisputedFailure: Observable<any> = this.actions.pipe(
    ofType(DisputesActionTypes.CREATE_DISPUTED_FAILURE),
    tap(() => {
      this.notificationsService.error('Error', 'Disputed was not created.');
    })
  );

  @Effect()
  UpdateDisputed: Observable<Action> = this.actions
    .ofType(DisputesActionTypes.UPDATE_DISPUTED)
    .map((action: UpdateDisputed) => action.payload)
    .switchMap(payload => {
      return this.disputesService.updateDisputed(payload)
        .map((data) => {
          return new UpdateDisputedSuccess(data);
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new UpdateDisputedFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  UpdateDisputedSuccess: Observable<any> = this.actions.pipe(
    ofType(DisputesActionTypes.UPDATE_DISPUTED_SUCCESS),
    tap(({payload: disputed_data}) => {
      this.notificationsService.success('Success', 'Disputed has been successfully updated.');
    })
  );

  @Effect({ dispatch: false })
  UpdateDisputedFailure: Observable<any> = this.actions.pipe(
    ofType(DisputesActionTypes.UPDATE_DISPUTED_FAILURE),
    tap(() => {
      this.notificationsService.error('Error', 'Disputed was not updated.');
    })
  );

  @Effect()
  RemoveDisputed: Observable<Action> = this.actions
    .ofType(DisputesActionTypes.REMOVE_DISPUTED)
    .map((action: RemoveDisputed) => action.payload)
    .switchMap(payload => {
      return this.disputesService.removeDisputed(payload)
        .map((data) => {
          return new RemoveDisputedSuccess(data);
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new RemoveDisputedFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  RemoveDisputedSuccess: Observable<any> = this.actions.pipe(
    ofType(DisputesActionTypes.REMOVE_DISPUTED_SUCCESS),
    tap(({payload: disputed_data}) => {
      this.notificationsService.success('Success', 'Disputed has been successfully removed.');
    })
  );

  @Effect({ dispatch: false })
  RemoveDisputedFailure: Observable<any> = this.actions.pipe(
    ofType(DisputesActionTypes.REMOVE_DISPUTED_FAILURE),
    tap(() => {
      this.notificationsService.error('Error', 'Disputed was not removed.');
    })
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

  @Effect()
  FetchDisputesByCase: Observable<Action> = this.actions
    .ofType(DisputesActionTypes.FETCH_DISPUTES_BY_CASE)
    .map((action: FetchDisputesByCase) => action.payload)
    .switchMap(payload => {
      console.log(payload);
      return this.disputesService.getDisputesByCase(payload)
        .map((data) => {
          return new FetchDisputesByCaseSuccess(data);
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new FetchDisputesByCaseFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  FetchDisputesByCaseSuccess: Observable<any> = this.actions.pipe(
    ofType(DisputesActionTypes.FETCH_DISPUTES_BY_CASE_SUCCESS),
    tap(({payload: disputes_data}) => {
      console.log('disputesData = ', disputes_data);
    })
  );

  @Effect({ dispatch: false })
  FetchDisputesByCaseFailure: Observable<any> = this.actions.pipe(
    ofType(DisputesActionTypes.FETCH_DISPUTES_BY_CASE_FAILURE)
  );

  @Effect()
  FetchDisputesBySummary: Observable<Action> = this.actions
    .ofType(DisputesActionTypes.FETCH_DISPUTES_BY_SUMMARY)
    .map((action: FetchDisputesBySummary) => action.payload)
    .switchMap(payload => {
      console.log(payload);
      return this.disputesService.getDisputesBySummary(payload)
        .map((data) => {
          return new FetchDisputesBySummarySuccess(data);
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new FetchDisputesBySummaryFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  FetchDisputesBySummarySuccess: Observable<any> = this.actions.pipe(
    ofType(DisputesActionTypes.FETCH_DISPUTES_BY_SUMMARY_SUCCESS),
    tap(({payload: disputes_data}) => {
      console.log('disputesData = ', disputes_data);
    })
  );

  @Effect({ dispatch: false })
  FetchDisputesBySummaryFailure: Observable<any> = this.actions.pipe(
    ofType(DisputesActionTypes.FETCH_DISPUTES_BY_SUMMARY_FAILURE)
  );
}
