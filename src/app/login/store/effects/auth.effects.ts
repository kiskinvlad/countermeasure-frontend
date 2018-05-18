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

import { AuthenticationService } from '@login/services/authentication/authentication.service';
import {
  AuthActionTypes,
  LogIn, LogInSuccess, LogInFailure,
  LogOut,
} from '../actions/auth.actions';
import {
  RoleActionTypes,
  FetchRole, FetchRoleSuccess, FetchRoleFailure
} from '../actions/role.actions';
import { RoleService } from '@app/login/services/role/role.service';

@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthenticationService,
    private roleService: RoleService,
    private router: Router,
  ) {}

  @Effect()
  LogIn: Observable<any> = this.actions
    .ofType(AuthActionTypes.LOGIN)
    .map((action: LogIn) => action.payload)
    .switchMap(payload => this.authService.logIn(payload.email, payload.password)
    .concatMap(user => {
      return Observable.from([
          new LogInSuccess({token: user.token, email: payload.email, role_id: user.user.role_id}),
          new FetchRole({role_id: user.user.role_id})
      ]); }
    )
    .catch((error) => {
      return Observable.of(new LogInFailure({ error: error }));
    }));

  @Effect()
  FetchRole: Observable<any> = this.actions
  .ofType(RoleActionTypes.FETCH_ROLE)
  .map((action: FetchRole) => action.payload)
  .switchMap(user =>
     this.roleService.getRole(user.role_id)
      .map((role) =>
         new FetchRoleSuccess({role: role})
      )
      .catch((error) => {
        console.log(error);
        return Observable.of(new FetchRoleFailure({ error: error }));
      }));

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      localStorage.setItem('token', user.payload.token);
    })
  );

  @Effect({ dispatch: false })
  FetchRoleSuccess: Observable<any> = this.actions.pipe(
    ofType(RoleActionTypes.FETCH_ROLE_SUCCESS),
    tap((role) => {
      localStorage.setItem('role_name', role.payload.role.user.role_name);
      this.router.navigateByUrl('/');
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  @Effect({ dispatch: false })
  public LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((user) => {
      localStorage.removeItem('token');
      this.router.navigateByUrl('/login');
    })
  );
}
