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
import 'rxjs/add/observable/throw';
import { NgxPermissionsService } from 'ngx-permissions';
import { PermissionService } from '@app/core/services/PermissionService/permission.service';
import { LocalStorageService } from '@app/core/services/LocalStorageService/local-storage.service';
import { PermissionActionTypes } from '@app/shared/ngrx-store/constants/permission';
import { NotificationsService } from 'angular2-notifications';
import { AppState } from '@app/shared/ngrx-store/app.states';

import {
  FetchPermissions,
  FetchPermissionsSuccess,
  FetchPermissionsFailure,
  AddPermissions,
  AddPermissionsSuccess,
  AddPermissionsFailure,
  DeletePermissions,
  DeletePermissionsSuccess,
  DeletePermissionsFailure,
} from '../actions/permission.actions';

@Injectable()
/**
 * Permission side-effects service. {@link https://github.com/ngrx/effects/blob/master/docs/intro.md Effects}
 */
export class PermissionEffects {
/**
 * @constructor
 * @param {Actions} actions App ngrx action service
 * @param {PermissionService} permissionService Permission service
 * @param {Router} router App router service
 * @param {LocalStorageService} localStorageService Local storage service
 * @param {NgxPermissionsService} permissionsService User ermissions service
 * @param {NotificationsService} notificationsService App notification service
 * @param {Store<AppState>} store App store service
 */
  constructor(
    private actions: Actions,
    private permissionService: PermissionService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private permissionsService: NgxPermissionsService,
    private notificationsService: NotificationsService,
    private store: Store<AppState>
  ) {}

    @Effect()
    FetchPermissions: Observable<Action> = this.actions
      .ofType(PermissionActionTypes.FETCH_PERMISSIONS)
      .map((action: FetchPermissions) => action.payload)
      .switchMap(payload => {
        return this.permissionService.getGuestPermissions(payload)
          .map((data) => {
            return new FetchPermissionsSuccess(data);
          })
          .catch((error) => {
            console.log(error);
            return Observable.of(new FetchPermissionsFailure({ error: error }));
          });
      });

    @Effect({ dispatch: false })
    FetchPermissionsFailure: Observable<any> = this.actions
      .ofType(PermissionActionTypes.FETCH_PERMISSIONS_FAILURE)
      .map(() => {
        this.notificationsService.error('Error', 'Unable to fetch guest permissions.');
      });

    @Effect({ dispatch: false })
    FetchPermissionsSuccess: Observable<any> = this.actions.pipe(
      ofType(PermissionActionTypes.FETCH_PERMISSIONS_SUCCESS)
    );

    @Effect()
    AddPermissions: Observable<Action> = this.actions
      .ofType(PermissionActionTypes.ADD_PERMISSIONS)
      .map((action: AddPermissions) => action.payload)
      .switchMap(payload => {

        return this.permissionService.addGuestPermissions(payload)
          .map((data) => {
            return new AddPermissionsSuccess(data);
          })
          .catch((error) => {
            console.log(error);
            return Observable.of(new AddPermissionsFailure({ error: error }));
          });
      });

    @Effect({ dispatch: false })
    AddPermissionsFailure: Observable<any> = this.actions
      .ofType(PermissionActionTypes.ADD_PERMISSIONS_FAILURE)
      .map(() => {
        this.notificationsService.error('Error', 'Unable to add guest permissions.');
      });

    @Effect({ dispatch: false })
    AddPermissionsSuccess: Observable<any> = this.actions.pipe(
      ofType(PermissionActionTypes.ADD_PERMISSIONS_SUCCESS)
    );

    @Effect()
    DeletePermissions: Observable<Action> = this.actions
      .ofType(PermissionActionTypes.DELETE_PERMISSIONS)
      .map((action: DeletePermissions) => action.payload)
      .switchMap(payload => {

        return this.permissionService.deleteGuestPermissions(payload)
          .map((data) => {
            return new DeletePermissionsSuccess(data);
          })
          .catch((error) => {
            console.log(error);
            return Observable.of(new DeletePermissionsFailure({ error: error }));
          });
      });

    @Effect({ dispatch: false })
    DeletePermissionsFailure: Observable<any> = this.actions
      .ofType(PermissionActionTypes.DELETE_PERMISSIONS_FAILURE)
      .map(() => {
        this.notificationsService.error('Error', 'Unable to delete guest permissions.');
      });

    @Effect({ dispatch: false })
    DeletePermissionsSuccess: Observable<any> = this.actions.pipe(
      ofType(PermissionActionTypes.DELETE_PERMISSIONS_SUCCESS)
    );
}
