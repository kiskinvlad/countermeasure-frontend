import { Action } from '@ngrx/store';
import { Organization } from '@app/shared/models/organization';
import { OrganizationActionTypes } from '@app/shared/ngrx-store/constants/organization';
/**
 * Fetch organization data action
 * Called when try to fetch organization data
 */
export class FetchOrganization implements Action {
  readonly type = OrganizationActionTypes.FETCH_ORGANIZATION;
  constructor(public payload: any) {}
}
/**
 * Fetch organization data success action
 * Called when fetch organization data successful
 */
export class FetchOrganizationSuccess implements Action {
  readonly type = OrganizationActionTypes.FETCH_ORGANIZATION_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Fetch organization data failure action
 * Called when fetch organization data failure
 */
export class FetchOrganizationFailure implements Action {
  readonly type = OrganizationActionTypes.FETCH_ORGANIZATION_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Update organization action
 * Called when try to update organization
 */
export class UpdateOrganization implements Action {
  readonly type = OrganizationActionTypes.UPDATE_ORGANIZATION;
  constructor(public payload: any) {}
}
/**
 * Update organization success action
 * Called when update organization successful
 */
export class UpdateOrganizationSuccess implements Action {
  readonly type = OrganizationActionTypes.UPDATE_ORGANIZATION_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Update organization failure action
 * Called when update organization failure
 */
export class UpdateOrganizationFailure implements Action {
  readonly type = OrganizationActionTypes.UPDATE_ORGANIZATION_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Fetch organizations data action
 * Called when try to fetch organizations data
 */
export class FetchOrganizations implements Action {
  readonly type = OrganizationActionTypes.FETCH_ORGANIZATIONS;
  constructor(public payload: any) {}
}
/**
 * Fetch organizations data success action
 * Called when fetch organizations data successful
 */
export class FetchOrganizationsSuccess implements Action {
  readonly type = OrganizationActionTypes.FETCH_ORGANIZATIONS_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Fetch organizations data failure action
 * Called when fetch organizations data failure
 */
export class FetchOrganizationsFailure implements Action {
  readonly type = OrganizationActionTypes.FETCH_ORGANIZATIONS_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Create organization action
 * Called when try to create organization
 */
export class CreateOrganization implements Action {
  readonly type = OrganizationActionTypes.CREATE_ORGANIZATION;
  constructor(public payload: any) {}
}
/**
 * Create organization success action
 * Called when create organization successful
 */
export class CreateOrganizationSuccess implements Action {
  readonly type = OrganizationActionTypes.CREATE_ORGANIZATION_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Create organization failure action
 * Called when create organization failure
 */
export class CreateOrganizationFailure implements Action {
  readonly type = OrganizationActionTypes.CREATE_ORGANIZATION_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Action types
 * Export action types
 */
export type All =
  | FetchOrganization
  | FetchOrganizationSuccess
  | FetchOrganizationFailure
  | UpdateOrganization
  | UpdateOrganizationSuccess
  | UpdateOrganizationFailure
  | FetchOrganizations
  | FetchOrganizationsSuccess
  | FetchOrganizationsFailure
  | CreateOrganization
  | CreateOrganizationSuccess
  | CreateOrganizationFailure;
