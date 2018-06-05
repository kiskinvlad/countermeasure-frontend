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
import { OrganizationService } from '@app/core/services/OrganizationService/organization.service';
import { OrganizationActionTypes } from '@app/shared/ngrx-store/constants/organization';
import { NotificationsService } from 'angular2-notifications';

import {
  FetchOrganization,
  FetchOrganizationFailure,
  FetchOrganizationSuccess,
  UpdateOrganization,
  UpdateOrganizationFailure,
  UpdateOrganizationSuccess
} from '../actions/organization.actions';

@Injectable()
export class OrganizationEffects {

  constructor(
    private actions: Actions,
    private organizationService: OrganizationService,
    private router: Router,
    private notificationsService: NotificationsService
  ) {}

  @Effect()
  FetchOrganization: Observable<Action> = this.actions
    .ofType(OrganizationActionTypes.FETCH_ORGANIZATION)
    .map((action: FetchOrganization) => action.payload)
    .switchMap(payload => {

      return this.organizationService.getOrganization(payload)
        .map((data) => {
          return new FetchOrganizationSuccess(data);
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new FetchOrganizationFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  FetchOrganizationFailure: Observable<any> = this.actions
    .ofType(OrganizationActionTypes.FETCH_ORGANIZATION_FAILURE)
    .map(() => {
    });

  @Effect({ dispatch: false })
  FetchOrganizationSuccess: Observable<any> = this.actions.pipe(
    ofType(OrganizationActionTypes.FETCH_ORGANIZATION_SUCCESS)
  );

  @Effect()
  UpdateOrganization: Observable<Action> = this.actions
    .ofType(OrganizationActionTypes.UPDATE_ORGANIZATION)
    .map((action: UpdateOrganization) => action.payload)
    .switchMap(payload => {

      return this.organizationService.updateOrganization(payload)
        .map((data) => {
          return new UpdateOrganizationSuccess(data);
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new UpdateOrganizationFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  UpdateOrganizationSuccess: Observable<any> = this.actions.pipe(
    ofType(OrganizationActionTypes.UPDATE_ORGANIZATION_SUCCESS),
    tap((data) => {
      this.notificationsService.success('Success', 'Organization details have been updated.');
    })
  );

  @Effect({ dispatch: false })
  UpdateOrganizationFailure: Observable<any> = this.actions
    .ofType(OrganizationActionTypes.UPDATE_ORGANIZATION_FAILURE)
    .map(() => {
      this.notificationsService.error('Error', 'Failed to update details.');
    });
}
