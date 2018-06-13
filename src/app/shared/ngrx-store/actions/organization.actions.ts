import { Action } from '@ngrx/store';
import { Organization } from '@app/shared/models/organization';
import { OrganizationActionTypes } from '@app/shared/ngrx-store/constants/organization';

export class FetchOrganization implements Action {
  readonly type = OrganizationActionTypes.FETCH_ORGANIZATION;
  constructor(public payload: any) {}
}

export class FetchOrganizationSuccess implements Action {
  readonly type = OrganizationActionTypes.FETCH_ORGANIZATION_SUCCESS;
  constructor(public payload: any) {}
}

export class FetchOrganizationFailure implements Action {
  readonly type = OrganizationActionTypes.FETCH_ORGANIZATION_FAILURE;
  constructor(public payload: any) {}
}

export class UpdateOrganization implements Action {
  readonly type = OrganizationActionTypes.UPDATE_ORGANIZATION;
  constructor(public payload: any) {}
}

export class UpdateOrganizationSuccess implements Action {
  readonly type = OrganizationActionTypes.UPDATE_ORGANIZATION_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdateOrganizationFailure implements Action {
  readonly type = OrganizationActionTypes.UPDATE_ORGANIZATION_FAILURE;
  constructor(public payload: any) {}
}

export class FetchOrganizations implements Action {
  readonly type = OrganizationActionTypes.FETCH_ORGANIZATIONS;
  constructor(public payload: any) {}
}

export class FetchOrganizationsSuccess implements Action {
  readonly type = OrganizationActionTypes.FETCH_ORGANIZATIONS_SUCCESS;
  constructor(public payload: any) {}
}

export class FetchOrganizationsFailure implements Action {
  readonly type = OrganizationActionTypes.FETCH_ORGANIZATIONS_FAILURE;
  constructor(public payload: any) {}
}

export class CreateOrganization implements Action {
  readonly type = OrganizationActionTypes.CREATE_ORGANIZATION;
  constructor(public payload: any) {}
}

export class CreateOrganizationSuccess implements Action {
  readonly type = OrganizationActionTypes.CREATE_ORGANIZATION_SUCCESS;
  constructor(public payload: any) {}
}

export class CreateOrganizationFailure implements Action {
  readonly type = OrganizationActionTypes.CREATE_ORGANIZATION_FAILURE;
  constructor(public payload: any) {}
}

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
