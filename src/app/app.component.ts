import { Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {

  getState: Observable<any>;
  errorMessage: string | null;
  subscription: Subscription;
  token: string;

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

  ngOnInit(): void {
    this.token = this.localStorageService.getAuthToken();
    this.subscription = this.getState.subscribe((state) => {
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

}
