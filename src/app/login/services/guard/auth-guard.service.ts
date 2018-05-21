import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '@login/services/authentication/authentication.service';
import { LocalStorageService } from '@app/services/local-storage.service';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '@store/app.states';
import { FetchUserData } from '@store/actions/auth.actions';
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
      if (!state.isAuthenticated && this.localStorageService.getUserToken()) {
        this.store.dispatch(new FetchUserData());
      }
      this.isAuth = state.isAuthenticated;
    });
  }

  canActivate(): boolean {
    if (!this.isAuth) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
