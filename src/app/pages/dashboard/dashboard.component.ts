import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Role } from '../../shared/models/role';
import { AppState, selectAuthState } from '../../shared/ngrx-store/app.states';
import { LogOut, FetchUserData } from '../../shared/ngrx-store/actions/auth.actions';
import { State } from '../../shared/ngrx-store/reducers/auth.reducers';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { NgxPermissionsService } from 'ngx-permissions';
import { LocalStorageService } from '../../core/services/LocalStorageService/local-storage.service';
@Component({
  selector: 'ct-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  getState$: Observable<any>;
  errorMessage: string | null;
  subscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private permissionsService: NgxPermissionsService,
    private localStorageService: LocalStorageService
  ) {
    this.getState$ = this.store.select(selectAuthState);
  }

  logout() {
    this.store.dispatch(new LogOut);
  }

  ngOnInit() {
    this.subscription = this.getState$.subscribe((state) => {
      if (state.errorMessage) {
        this.errorMessage = state.errorMessage;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
