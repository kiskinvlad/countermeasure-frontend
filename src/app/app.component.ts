import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@login/services/authentication/authentication.service';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '@app/app.states';
import { NgxPermissionsService } from 'ngx-permissions';
import { LocalStorageService } from '@app/services/local-storage.service';
import { FetchUserData } from '@app/login/store/actions/auth.actions';

@Component({
  selector: 'ct-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  getState: Observable<any>;
  errorMessage: string | null;
  subscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private permissionsService: NgxPermissionsService,
    private localStorageService: LocalStorageService
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  title = 'ct';

  ngOnInit(): void {
    this.subscription = this.getState.subscribe((state) => {
      if (state.errorMessage) {
        this.errorMessage = state.errorMessage;
      }
      if (!state.isAuthenticated && this.localStorageService.getUserToken()) {
        this.store.dispatch(new FetchUserData());
      }
    });
  }

}
