import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { LogOut } from '@app/shared/ngrx-store/actions/auth.actions';
import { Observable, Subscription } from 'rxjs/';
import { AppState, selectAuthState } from '../../ngrx-store/app.states';

@Component({
  selector: 'ct-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit, OnDestroy {

  getState$: Observable<any>;
  errorMessage: string | null;
  subscription: Subscription;
  userName: string;
  userRole: string;
  userOrg: number;

  constructor(
    private store: Store<AppState>
  ) {
    this.getState$ = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.subscription = this.getState$.subscribe((state) => {
      this.errorMessage = state.errorMessage;

      if (state.user) {
        this.userName = [state.user.first_name, state.user.last_name].join(' ');
        this.userRole = state.user.role_id;
        this.userOrg = state.user.org_id;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logOut() {
    this.store.dispatch(new LogOut());
  }
}
