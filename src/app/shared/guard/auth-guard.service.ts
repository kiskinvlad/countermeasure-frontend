import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';
import { AuthenticationService } from '@app/core/services/AuthenticationService/authentication.service';
import { LocalStorageService } from '@app/core/services/LocalStorageService/local-storage.service';
import { AppState, selectAuthState } from '@app/shared/ngrx-store/app.states';
import { FetchUserData } from '@app/shared/ngrx-store/actions/auth.actions';
@Injectable()
/**
 * Authentication guard service. Check user authentication, token expired, prevent unauthorized routing
 * @implements {CanActivate}
 */
export class AuthGuardService implements CanActivate {
/**
 * @param {Store<any>} getState$ App state param
 * @param {string | null} errorMessage Error message param
 * @param {Subscription} subscription Subscription param
 * @param {boolean} isAuth User authentication state param
 */
  getState$: Store<any>;
  errorMessage: string | null;
  subscription: Subscription;
  isAuth: boolean;
/**
 * @constructor
 * @param {Router} router Application router service
 * @param {LocalStorageService} localStorageService Local storage service
 * @param {Store<AppState>} store  App store service
 */
  constructor(private auth: AuthenticationService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private store: Store<AppState>
  ) {
    this.getState$ = this.store.select(selectAuthState);
    this.subscription = this.getState$.subscribe((state) => {
      if (!state.isAuthenticated && this.localStorageService.getAuthToken()) {
        this.store.dispatch(new FetchUserData());
      }
      this.isAuth = state.isAuthenticated;
    });
  }
/**
 * Can activate method. Allow/prevent user routing
 * @returns {boolean}
 */
  canActivate(): boolean {
    if (!this.isAuth || this.auth.isTokenExpired(this.localStorageService.getAuthToken())) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
