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

import { SceneriesActionTypes } from '@app/shared/ngrx-store/constants/scenario';
import { ScenarioService } from '@app/core/services/ScenarioService/scenario.service';
import {
    FetchSceneries,
    FetchSceneriesSuccess,
    FetchSceneriesFailure,
    MoveScenario,
    MoveScenarioSuccess,
    MoveScenarioFailure,
    DeleteScenarioFromList,
    DeleteScenarioFromListSuccess,
    DeleteScenarioFromListFailure,
    FetchScenario,
    FetchScenarioSuccess,
    FetchScenarioFailure,
    DeleteScenario,
    DeleteScenarioSuccess,
    DeleteScenarioFailure,
    UpdateScenario,
    UpdateScenarioSuccess,
    UpdateScenarioFailure,
    CreateScenario,
    CreateScenarioSuccess,
    CreateScenarioFailure
    } from '@app/shared/ngrx-store/actions/scenario.actions';

@Injectable()
export class ScenarioEffects {

  constructor(
    private actions: Actions,
    private scenarioService: ScenarioService,
    private router: Router,
    private notificationsService: NotificationsService
  ) {}

  @Effect()
  FetchSceneries: Observable<Action> = this.actions
    .ofType(SceneriesActionTypes.FETCH_SCENERIES)
    .map((action: FetchSceneries) => action.payload)
    .switchMap(payload => {
      return this.scenarioService.getFilteredAndSorted(payload)
        .map((data) => {
          return new FetchSceneriesSuccess(data);
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new FetchSceneriesFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  FetchSceneriesSuccess: Observable<any> = this.actions.pipe(
    ofType(SceneriesActionTypes.FETCH_SCENERIES_SUCCESS)
  );

  @Effect({ dispatch: false })
  FetchSceneriesFailure: Observable<any> = this.actions.pipe(
    ofType(SceneriesActionTypes.FETCH_SCENERIES_FAILURE)
  );

  @Effect()
  MoveScenario: Observable<Action> = this.actions
    .ofType(SceneriesActionTypes.MOVE_SCENARIO)
    .map((action: MoveScenario) => action.payload)
    .switchMap(payload => {
      return this.scenarioService.moveScenario(payload)
        .map((data) => {
          return new MoveScenarioSuccess(data);
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new MoveScenarioFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  MoveScenarioSuccess: Observable<any> = this.actions.pipe(
    ofType(SceneriesActionTypes.MOVE_SCENARIO_SUCCESS)
  );

  @Effect({ dispatch: false })
  MoveScenarioFailure: Observable<any> = this.actions.pipe(
    ofType(SceneriesActionTypes.MOVE_SCENARIO_FAILURE)
  );

  @Effect()
  DeleteScenarioFromList: Observable<Action> = this.actions
    .ofType(SceneriesActionTypes.DELETE_SCENARIO_FROM_LIST)
    .map((action: DeleteScenarioFromList) => action.payload)
    .switchMap(payload => {
      return this.scenarioService.deleteScenarioFromList(payload)
        .map((data) => {
          return new DeleteScenarioFromListSuccess(data);
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new DeleteScenarioFromListFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  DeleteScenarioFromListSuccess: Observable<any> = this.actions.pipe(
    ofType(SceneriesActionTypes.DELETE_SCENARIO_FROM_LIST_SUCCESS)
  );

  @Effect({ dispatch: false })
  DeleteScenarioFromListFailure: Observable<any> = this.actions.pipe(
    ofType(SceneriesActionTypes.DELETE_SCENARIO_FROM_LIST_FAILURE)
  );

  @Effect()
  FetchScenario: Observable<Action> = this.actions
    .ofType(SceneriesActionTypes.FETCH_SCENARIO)
    .map((action: FetchScenario) => action.payload)
    .switchMap(payload => {
      return this.scenarioService.getScenario(payload)
        .map((data) => {
          return new FetchScenarioSuccess(data);
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new FetchScenarioFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  FetchScenarioSuccess: Observable<any> = this.actions.pipe(
    ofType(SceneriesActionTypes.FETCH_SCENARIO_SUCCESS)
  );

  @Effect({ dispatch: false })
  FetchScenarioFailure: Observable<any> = this.actions.pipe(
    ofType(SceneriesActionTypes.FETCH_SCENARIO_FAILURE)
  );

  @Effect()
  DeleteScenario: Observable<Action> = this.actions
    .ofType(SceneriesActionTypes.DELETE_SCENARIO)
    .map((action: DeleteScenario) => action.payload)
    .switchMap(payload => {
      return this.scenarioService.deleteScenario(payload)
        .map((data) => {
          return new DeleteScenarioSuccess(payload);
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new DeleteScenarioFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  DeleteScenarioSuccess: Observable<any> = this.actions.pipe(
    ofType(SceneriesActionTypes.DELETE_SCENARIO_SUCCESS),
    tap(({payload: data}) => {
      this.router.navigate(['/case', data.case_id, 'scenaries']);
      this.notificationsService.success('Success', 'Scenario ' + data.name + ' deleted!');
    })
  );

  @Effect({ dispatch: false })
  DeleteScenarioFailure: Observable<any> = this.actions.pipe(
    ofType(SceneriesActionTypes.DELETE_SCENARIO_FAILURE),
    tap(() => {
      this.notificationsService.error('Failure', 'Scenario not deleted.');
    })
  );

  @Effect()
  UpdateScenario: Observable<Action> = this.actions
    .ofType(SceneriesActionTypes.UPDATE_SCENARIO)
    .map((action: UpdateScenario) => action.payload)
    .switchMap(payload => {
      return this.scenarioService.updateScenario(payload)
        .map((data) => {
          return new UpdateScenarioSuccess(data);
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new UpdateScenarioFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  UpdateScenarioSuccess: Observable<any> = this.actions.pipe(
    ofType(SceneriesActionTypes.UPDATE_SCENARIO_SUCCESS),
    tap(({payload: data}) => {
      this.router.navigate(['/case', data.scenario.case_id, 'scenaries']);
      this.notificationsService.success('Successful', 'Scenario ' + data.scenario.name + ' updated!');
    })
  );

  @Effect({ dispatch: false })
  UpdateScenarioFailure: Observable<any> = this.actions.pipe(
    ofType(SceneriesActionTypes.UPDATE_SCENARIO_FAILURE),
    tap(() => {
      this.notificationsService.error('Failure', 'Scenario not updated.');
    })
  );

  @Effect()
  CreateScenario: Observable<Action> = this.actions
    .ofType(SceneriesActionTypes.CREATE_SCENARIO)
    .map((action: CreateScenario) => action.payload)
    .switchMap(payload => {
      return this.scenarioService.createScenario(payload)
        .map((data) => {
          return new CreateScenarioSuccess(data);
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new CreateScenarioFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  CreateScenarioSuccess: Observable<any> = this.actions.pipe(
    ofType(SceneriesActionTypes.CREATE_SCENARIO_SUCCESS),
    tap(({payload: data}) => {
      this.router.navigate(['/case', data.scenario.case_id, 'scenaries']);
      this.notificationsService.success('Successful', 'Scenario ' + data.scenario.name + ' created!');
    })
  );

  @Effect({ dispatch: false })
  CreateScenarioFailure: Observable<any> = this.actions.pipe(
    ofType(SceneriesActionTypes.CREATE_SCENARIO_FAILURE),
    tap(() => {
      this.notificationsService.error('Failure', 'Scenario not created.');
    })
  );
}
