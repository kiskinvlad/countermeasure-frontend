import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs/';
import { User } from '@app/shared/models/user';
import { AppState, selectAuthState } from '@app/shared/ngrx-store/app.states';
import { LogIn } from '@app/shared/ngrx-store/actions/auth.actions';

@Component({
  selector: 'ct-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  user: User = new User();
  getState$: Observable<any>;
  errorMessage: string | null;
  subscription: Subscription;

  constructor(
    private store: Store<AppState>
  ) {
    this.getState$ = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.subscription = this.getState$.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  login(): void {
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    this.store.dispatch(new LogIn(payload));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
