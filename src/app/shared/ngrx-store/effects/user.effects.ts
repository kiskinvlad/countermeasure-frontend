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
import 'rxjs/add/observable/throw';
import { NgxPermissionsService } from 'ngx-permissions';
import { UserService } from '@app/core/services/UserService/user.service';
import { LocalStorageService } from '@app/core/services/LocalStorageService/local-storage.service';
import { UserActionTypes } from '@app/shared/ngrx-store/constants/user';
import { NotificationsService } from 'angular2-notifications';
import { AppState } from '@app/shared/ngrx-store/app.states';

import {
  FetchUser,
  FetchUserFailure,
  FetchUserSuccess,
  UpdateUser,
  UpdateUserFailure,
  UpdateUserSuccess,
  UpdatePassword,
  UpdatePasswordFailure,
  UpdatePasswordSuccess,
  FetchUsers,
  FetchUsersFailure,
  FetchUsersSuccess,
  CreateUser,
  CreateUserFailure,
  CreateUserSuccess,
  FetchPermissions,
  FetchPermissionsSuccess,
  FetchPermissionsFailure,
  AddPermissions,
  AddPermissionsSuccess,
  AddPermissionsFailure,
  DeletePermissions,
  DeletePermissionsSuccess,
  DeletePermissionsFailure,
} from '../actions/user.actions';

@Injectable()
export class UserEffects {

  constructor(
    private actions: Actions,
    private userService: UserService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private permissionsService: NgxPermissionsService,
    private notificationsService: NotificationsService,
    private store: Store<AppState>
  ) {}

  @Effect()
  FetchUser: Observable<Action> = this.actions
    .ofType(UserActionTypes.FETCH_USER)
    .map((action: FetchUser) => action.payload)
    .switchMap(payload => {

      return this.userService.getUser(payload)
        .map((data) => {
          return new FetchUserSuccess(data);
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new FetchUserFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  FetchUserFailure: Observable<any> = this.actions
    .ofType(UserActionTypes.FETCH_USER_FAILURE)
    .map(() => {
    });

  @Effect({ dispatch: false })
  FetchUserSuccess: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.FETCH_USER_SUCCESS)
  );

  @Effect()
  UpdateUser: Observable<Action> = this.actions
    .ofType(UserActionTypes.UPDATE_USER)
    .map((action: UpdateUser) => action.payload)
    .switchMap(payload => {

      return this.userService.updateUser(payload)
        .map((data) => {
          return new UpdateUserSuccess(data);
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new UpdateUserFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  UpdateUserSuccess: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.UPDATE_USER_SUCCESS),
    tap((data) => {
      this.notificationsService.success('Success', 'User details have been updated.');
    })
  );

  @Effect({ dispatch: false })
  UpdateUserFailure: Observable<any> = this.actions
    .ofType(UserActionTypes.UPDATE_USER_FAILURE)
    .map(() => {
      this.notificationsService.error('Error', 'Failed to update details.');
    });

  @Effect()
  UpdatePassword: Observable<Action> = this.actions
    .ofType(UserActionTypes.UPDATE_PASSWORD)
    .map((action: UpdatePassword) => action.payload)
    .switchMap(payload => {

      return this.userService.updatePassword(payload)
        .map((data) => {
          return new UpdatePasswordSuccess(data);
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new UpdatePasswordFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  UpdatePasswordSuccess: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.UPDATE_PASSWORD_SUCCESS),
    tap((data) => {
      this.notificationsService.success('Success', 'Your password has been updated.');
    })
  );

  @Effect({ dispatch: false })
  UpdatePasswordFailure: Observable<any> = this.actions
    .ofType(UserActionTypes.UPDATE_PASSWORD_FAILURE)
    .map(() => {
      this.notificationsService.error('Error', 'Please make sure your current password was entered correctly.');
    });

    @Effect()
    FetchUsers: Observable<Action> = this.actions
      .ofType(UserActionTypes.FETCH_USERS)
      .map((action: FetchUsers) => action.payload)
      .switchMap(payload => {

        return this.userService.getUsers(payload)
          .map((data) => {
            return new FetchUsersSuccess(data);
          })
          .catch((error) => {
            console.log(error);
            return Observable.of(new FetchUsersFailure({ error: error }));
          });
      });

    @Effect({ dispatch: false })
    FetchUsersFailure: Observable<any> = this.actions
      .ofType(UserActionTypes.FETCH_USERS_FAILURE)
      .map(() => {
        this.notificationsService.error('Error', 'Unable to fetch users.');
      });

    @Effect({ dispatch: false })
    FetchUsersSuccess: Observable<any> = this.actions.pipe(
      ofType(UserActionTypes.FETCH_USERS_SUCCESS)
    );

    @Effect()
    CreateUser: Observable<Action> = this.actions
      .ofType(UserActionTypes.CREATE_USER)
      .map((action: CreateUser) => action.payload)
      .switchMap(payload => {

        return this.userService.createUser(payload)
          .map((data) => {
            return new CreateUserSuccess(data);
          })
          .catch((error) => {
            console.log(error);
            return Observable.of(new CreateUserFailure({ error: error }));
          });
      });

    @Effect({ dispatch: false })
    CreateUserSuccess: Observable<any> = this.actions.pipe(
      ofType(UserActionTypes.CREATE_USER_SUCCESS),
      tap((data) => {
        this.notificationsService.success('Success', 'New user has been created.');
        const user = data.payload.user;
        let role = 'members';
        if (user.role_id === 'OG') {
          role = 'guests';
        }
        this.router.navigateByUrl('/organization/' + user.org_id + '/' + role + '/edit/' + user.user_id);
      })
    );

    @Effect({ dispatch: false })
    CreateUserFailure: Observable<any> = this.actions
      .ofType(UserActionTypes.CREATE_USER_FAILURE)
      .map(() => {
        this.notificationsService.error('Error', 'Failed to create new user.');
      });

    @Effect()
    FetchPermissions: Observable<Action> = this.actions
      .ofType(UserActionTypes.FETCH_PERMISSIONS)
      .map((action: FetchPermissions) => action.payload)
      .switchMap(payload => {

        return this.userService.getGuestPermissions(payload)
          .map((data) => {
            return new FetchPermissionsSuccess(data);
          })
          .catch((error) => {
            console.log(error);
            return Observable.of(new FetchPermissionsFailure({ error: error }));
          });
      });

    @Effect({ dispatch: false })
    FetchPermissionsFailure: Observable<any> = this.actions
      .ofType(UserActionTypes.FETCH_PERMISSIONS_FAILURE)
      .map(() => {
        this.notificationsService.error('Error', 'Unable to fetch guest permissions.');
      });

    @Effect({ dispatch: false })
    FetchPermissionsSuccess: Observable<any> = this.actions.pipe(
      ofType(UserActionTypes.FETCH_PERMISSIONS_SUCCESS)
    );

    @Effect()
    AddPermissions: Observable<Action> = this.actions
      .ofType(UserActionTypes.ADD_PERMISSIONS)
      .map((action: AddPermissions) => action.payload)
      .switchMap(payload => {

        return this.userService.addGuestPermissions(payload)
          .map((data) => {
            return new AddPermissionsSuccess(data);
          })
          .catch((error) => {
            console.log(error);
            return Observable.of(new AddPermissionsFailure({ error: error }));
          });
      });

    @Effect({ dispatch: false })
    AddPermissionsFailure: Observable<any> = this.actions
      .ofType(UserActionTypes.ADD_PERMISSIONS_FAILURE)
      .map(() => {
        this.notificationsService.error('Error', 'Unable to add guest permissions.');
      });

    /*@Effect({ dispatch: false })
    AddPermissionsSuccess: Observable<any> = this.actions.pipe(
      ofType(UserActionTypes.ADD_PERMISSIONS_SUCCESS),
      tap((data) => {
        const user_id = data.payload.user_id;
        const payload = {
          user_id: data.payload.userID,
          org_id: data.payload.orgID,
          offset: data.payload.offset,
          limit: data.payload.this.itemsPerPage,
          cases: JSON.stringify(this.addedCases)
        };
        this.store.dispatch(new FetchUser(payload));
      })
    );*/

    @Effect({ dispatch: false })
    AddPermissionsSuccess: Observable<any> = this.actions.pipe(
      ofType(UserActionTypes.ADD_PERMISSIONS_SUCCESS)
    );

    @Effect()
    DeletePermissions: Observable<Action> = this.actions
      .ofType(UserActionTypes.DELETE_PERMISSIONS)
      .map((action: DeletePermissions) => action.payload)
      .switchMap(payload => {

        return this.userService.deleteGuestPermissions(payload)
          .map((data) => {
            return new DeletePermissionsSuccess(data);
          })
          .catch((error) => {
            console.log(error);
            return Observable.of(new DeletePermissionsFailure({ error: error }));
          });
      });

    @Effect({ dispatch: false })
    DeletePermissionsFailure: Observable<any> = this.actions
      .ofType(UserActionTypes.DELETE_PERMISSIONS_FAILURE)
      .map(() => {
        this.notificationsService.error('Error', 'Unable to delete guest permissions.');
      });

    @Effect({ dispatch: false })
    DeletePermissionsSuccess: Observable<any> = this.actions.pipe(
      ofType(UserActionTypes.DELETE_PERMISSIONS_SUCCESS)
    );
}
