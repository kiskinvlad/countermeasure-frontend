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
export class AuthGuardService implements CanActivate {

  getState$: Store<any>;
  errorMessage: string | null;
  subscription: Subscription;
  isAuth: boolean;

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

  canActivate(): boolean {
    if (!this.isAuth || this.auth.isTokenExpired(this.localStorageService.getAuthToken())) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
