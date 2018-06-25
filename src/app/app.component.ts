import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { NgxPermissionsService } from 'ngx-permissions';
import { AppState, selectAuthState } from '@app/shared/ngrx-store/app.states';
import { LocalStorageService } from '@app/core/services/LocalStorageService/local-storage.service';
import { FetchUserData } from '@app/shared/ngrx-store/actions/auth.actions';
import { AuthenticationService } from '@app/core/services/AuthenticationService/authentication.service';

@Component({
  selector: 'ct-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
/**
 * @param {Observable<any>} getState$ State observable param
 * @param {string | null} errorMessage Error message param
 * @param {Subscription} subscription Subscription param
 * @param {string} token Authentication token param
 */
  getState: Observable<any>;
  errorMessage: string | null;
  subscription: Subscription;
  token: string;
/**
 * @constructor
 * @param {Store<AppState>} store App store service
 * @param {NgxPermissionsService} permissionsService User permissions service
 * @param {LocalStorageService} localStorageService Local storage service
 * @param {AuthenticationService} auth Authentication service
 */
  constructor(
    private store: Store<AppState>,
    private permissionsService: NgxPermissionsService,
    private localStorageService: LocalStorageService,
    private auth: AuthenticationService
  ) {
    this.getState = this.store.select(selectAuthState);
    this.token = this.localStorageService.getAuthToken();
  }

  title = 'ct';
/**
 * Initialize app component life cycle method
 */
  ngOnInit(): void {
    this.subscription = this.getState.subscribe((state) => {
      this.token = this.localStorageService.getAuthToken();
      if (state.errorMessage) {
        this.errorMessage = state.errorMessage;
      }
      if (!state.isAuthenticated && this.token) {
        if (!this.auth.isTokenExpired(this.token)) {
          this.store.dispatch(new FetchUserData());
        }
      }
    });
  }
/**
 * Destroy app component life cycle method
 */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
