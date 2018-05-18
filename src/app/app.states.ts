import { createFeatureSelector } from '@ngrx/store';

import * as auth from '@login/store/reducers/auth.reducers';
import * as role from '@login/store/reducers/role.reducers';

export interface AppState {
  authState: auth.State;
  roleState: role.State;
}

export const reducers = {
  auth: auth.reducer,
  role: role.reducer
};

export const selectAuthState = createFeatureSelector<AppState>('auth');
export const selectRoleState = createFeatureSelector<AppState>('role');
