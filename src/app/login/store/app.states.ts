import { createFeatureSelector } from '@ngrx/store';

import * as auth from './reducers/auth.reducers';
import * as role from './reducers/role.reducers';

export interface AppState {
  authState: auth.State;
  roleState: role.State;
}

export const reducers = {
  auth: auth.reducer,
  role: role.reducer
};

export const selectAuthState = createFeatureSelector<AppState>('auth');
