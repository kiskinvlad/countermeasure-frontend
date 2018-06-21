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
  UpdateOrganizationSuccess,
  FetchOrganizations,
  FetchOrganizationsSuccess,
  FetchOrganizationsFailure,
  CreateOrganization,
  CreateOrganizationSuccess,
  CreateOrganizationFailure
} from '../actions/organization.actions';

@Injectable()
/**
 * Oranization side-effects service. {@link https://github.com/ngrx/effects/blob/master/docs/intro.md Effects}
 */
export class OrganizationEffects {
/**
 * @constructor
 * @param {Actions} actions App ngrx action service
 * @param {OrganizationService} organizationService Organization service
 * @param {Router} router App router service
 * @param {NotificationsService} notificationsService App notification service
 */
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

  @Effect()
  FetchOrganizations: Observable<Action> = this.actions
    .ofType(OrganizationActionTypes.FETCH_ORGANIZATIONS)
    .map((action: FetchOrganizations) => action.payload)
    .switchMap(payload => {

      return this.organizationService.getOrganizations(payload)
        .map((data) => {
          return new FetchOrganizationsSuccess(data);
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new FetchOrganizationsFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  FetchOrganizationsFailure: Observable<any> = this.actions
    .ofType(OrganizationActionTypes.FETCH_ORGANIZATIONS_FAILURE)
    .map(() => {
      this.notificationsService.error('Error', 'Failed to fetch organizations.');
    });

  @Effect({ dispatch: false })
  FetchOrganizationsSuccess: Observable<any> = this.actions.pipe(
    ofType(OrganizationActionTypes.FETCH_ORGANIZATIONS_SUCCESS)
  );

  @Effect()
  CreateOrganization: Observable<Action> = this.actions
    .ofType(OrganizationActionTypes.CREATE_ORGANIZATION)
    .map((action: CreateOrganization) => action.payload)
    .switchMap(payload => {

      return this.organizationService.createOrganization(payload)
        .map((data) => {
          return new CreateOrganizationSuccess(data);
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new CreateOrganizationFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  CreateOrganizationSuccess: Observable<any> = this.actions.pipe(
    ofType(OrganizationActionTypes.CREATE_ORGANIZATION_SUCCESS),
    tap((data) => {
      this.notificationsService.success('Success', 'Organization has been created.');
    })
  );

  @Effect({ dispatch: false })
  CreateOrganizationFailure: Observable<any> = this.actions
    .ofType(OrganizationActionTypes.CREATE_ORGANIZATION_FAILURE)
    .map(() => {
      this.notificationsService.error('Error', 'Failed to create organization.');
    });
}
