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

export interface AppState {
  authState: auth.State;
  roleState: role.State;
  casesState: cases.State;
  userState: user.State;
}

export const reducers = {
  authState: auth.reducer,
  roleState: role.reducer,
  casesState: cases.reducer,
  userState: user.reducer
};

export const selectAuthState = createFeatureSelector<AppState>('authState');
export const selectRoleState = createFeatureSelector<AppState>('roleState');
export const selectCasesState = createFeatureSelector<AppState>('casesState');
export const selectUserState = createFeatureSelector<AppState>('userState');
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

