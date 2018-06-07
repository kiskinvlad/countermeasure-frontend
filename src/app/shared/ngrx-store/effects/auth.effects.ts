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
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthenticationService } from '@app/core/services/AuthenticationService/authentication.service';
import { RoleService } from '@app/core/services/UserRoleService/role.service';
import { LocalStorageService } from '@app/core/services/LocalStorageService/local-storage.service';
import { AuthActionTypes } from '@app/shared/ngrx-store/constants/auth';

import {
  LogIn, LogInSuccess, LogInFailure,
  LogOut, LogOutSuccess, LogOutFailure,
  FetchUserData,
  FetchUserDataFailure,
  FetchUserDataSuccess,
} from '../actions/auth.actions';
import {
  FetchRole, FetchRoleSuccess, FetchRoleFailure
} from '../actions/role.actions';



@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthenticationService,
    private roleService: RoleService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private permissionsService: NgxPermissionsService
  ) {}

  @Effect()
  LogIn: Observable<Action> = this.actions
    .ofType(AuthActionTypes.LOGIN)
    .map((action: LogIn) => action.payload)
    .switchMap(payload => {
      return this.authService.logIn(payload)
        .map((data) => {
          return new LogInSuccess({
            token: data.token, email: data.user.email, first_name: data.user.first_name,
            last_name: data.user.last_name, role_name: data.user.role_name,
            role_id: data.user.role_id, org_id: data.user.org_id, user_id: data.user.user_id
          });
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new LogInFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((data) => {
      this.localStorageService.setUserData(data.payload);
      this.permissionsService.loadPermissions(this.localStorageService.getUserRole().split(' '));
      this.router.navigateByUrl('/');
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  @Effect()
  FetchUserData: Observable<any> = this.actions
    .ofType(AuthActionTypes.FETCH_USER_DATA)
    .map((user) => {
      if (!this.localStorageService.getUserRole()) {
        return new FetchUserDataFailure({error: 'Failed fetch user from local storage.'});
      } else {
        return new FetchUserDataSuccess(
          this.localStorageService.getUserData(),
        );
      }
    });

  @Effect({ dispatch: false })
  FetchUserDataFailure: Observable<any> = this.actions
    .ofType(AuthActionTypes.FETCH_USER_DATA_FAILURE)
    .map(() => {
      this.router.navigateByUrl('/login');
    });

  @Effect({ dispatch: false })
  FetchUserDataSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.FETCH_USER_DATA_SUCCESS),
    tap((data) => {
      this.localStorageService.setUserData(data.payload);
      this.permissionsService.loadPermissions(this.localStorageService.getUserRole().split(' '));
    })
  );

  @Effect({ dispatch: false })
  public LogOutFailure: Observable<any> = this.actions
    .ofType(AuthActionTypes.LOGOUT);

  @Effect()
  LogOut: Observable<any> = this.actions
    .ofType(AuthActionTypes.LOGOUT)
    .map(() => {
      this.localStorageService.removeUserData();
      if (!this.localStorageService.getUserRole()) {
        return new LogOutSuccess();
      } else {
        return new LogOutFailure({error: 'Logout Failure'});
      }
    });

  @Effect({ dispatch: false })
  public LogOutSuccess: Observable<any> = this.actions
    .ofType(AuthActionTypes.LOGOUT_SUCCESS)
    .map((user) => {
      this.router.navigateByUrl('/login');
    });
}
