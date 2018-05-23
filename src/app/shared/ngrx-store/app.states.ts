import { createFeatureSelector, ActionReducer, State, ActionReducerMap, Store, combineReducers, createSelector } from '@ngrx/store';

import * as auth from './reducers/auth.reducers';
import * as role from './reducers/role.reducers';
export interface AppState {
  authState: auth.State;
  roleState: role.State;
}

export const reducers = {
  authState: auth.reducer,
  roleState: role.reducer
};

export const selectAuthState = createFeatureSelector<AppState>('authState');
export const selectRoleState = createFeatureSelector<AppState>('roleState');
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

