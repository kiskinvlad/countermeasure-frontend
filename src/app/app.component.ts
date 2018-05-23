import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { NgxPermissionsService } from 'ngx-permissions';
import { AppState, selectAuthState } from '@app/shared/ngrx-store/app.states';
import { LocalStorageService } from '@app/core/services/LocalStorageService/local-storage.service';
import { FetchUserData } from '@app/shared/ngrx-store/actions/auth.actions';

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
      if (!state.isAuthenticated && this.localStorageService.getAuthToken()) {
        this.store.dispatch(new FetchUserData());
      }
    });
  }

}
