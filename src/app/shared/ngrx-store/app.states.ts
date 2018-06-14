import {
  createFeatureSelector,
  ActionReducer,
  State,
  ActionReducerMap,
  Store,
  combineReducers,
  createSelector
} from '@ngrx/store';

import * as auth from '@shared/ngrx-store/reducers/auth.reducers';
import * as role from '@shared/ngrx-store/reducers/role.reducers';
import * as cases from '@shared/ngrx-store/reducers/cases.reducers';
import * as user from '@shared/ngrx-store/reducers/user.reducers';
import * as category from '@shared/ngrx-store/reducers/category.reducers';
import * as disputes from '@shared/ngrx-store/reducers/disputes.reducers';
import * as scenario from '@shared/ngrx-store/reducers/scenario.reducers';
import * as organization from '@shared/ngrx-store/reducers/organization.reducers';
import * as csv from '@shared/ngrx-store/reducers/csv.reducers';
import * as permission from '@shared/ngrx-store/reducers/permission.reducers';

export interface AppState {
  authState: auth.State;
  roleState: role.State;
  casesState: cases.State;
  userState: user.State;
  categoryState: category.State;
  disputesState: disputes.State;
  scenarioState: scenario.State;
  organizationState: organization.State;
  csvState: csv.State;
  permissionState: permission.State;
}

export const reducers = {
  authState: auth.reducer,
  roleState: role.reducer,
  casesState: cases.reducer,
  disputesState: disputes.reducer,
  userState: user.reducer,
  categoryState: category.reducer,
  scenarioState: scenario.reducer,
  organizationState: organization.reducer,
  csvState: csv.reducer,
  permissionState: permission.reducer
};

export const selectAuthState = createFeatureSelector<AppState>('authState');
export const selectRoleState = createFeatureSelector<AppState>('roleState');
export const selectCasesState = createFeatureSelector<AppState>('casesState');
export const selectUserState = createFeatureSelector<AppState>('userState');
export const selectCategoryState = createFeatureSelector<AppState>('categoryState');
export const selectDisputesState = createFeatureSelector<AppState>('disputesState');
export const selectScenarioState = createFeatureSelector<AppState>('scenarioState');
export const selectOrganizationState = createFeatureSelector<AppState>('organizationState');
export const selectCsvState = createFeatureSelector<AppState>('csvState');
export const selectPermissionState = createFeatureSelector<AppState>('permissionState');

const combinedReducer: ActionReducer<AppState> = combineReducers(reducers);

/**
 * The single reducer function.
 * @function reducer
 * @param {any} state
 * @param {any} action
 */
export function reducer(state: any, action: any) {
  return combinedReducer(state, action);
}

export const getAuthState = (state: AppState) => state.authState;
