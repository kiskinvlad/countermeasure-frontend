import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Observable, Subscription, VirtualTimeScheduler } from 'rxjs/';
import { Store } from '@ngrx/store';
import { LogIn } from '@app/shared/ngrx-store/actions/auth.actions';
import { User } from '@app/shared/models/user';
import { AppState, selectAuthState } from '@app/shared/ngrx-store/app.states';
import { ValidatorModule } from '@app/shared/form-validator/validator.module';

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
  authForm: FormGroup;
  email: FormControl;
  password: FormControl;
  validator: ValidatorModule;

  constructor(
    private store: Store<AppState>
  ) {
    this.getState$ = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.subscription = this.getState$.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
    this.createFormControls();
    this.createForm();
    this.validator = new ValidatorModule();
  }

  private createFormControls() {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[^ @]*@[^ @]*')
    ]);
    this.password = new FormControl('', [
      Validators.required,
    ]);
  }

  private createForm() {
    this.authForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  login(): void {
    const payload = {
      email: this.user.email = this.email.value,
      password: this.user.password = this.password.value
    };
    if (!this.authForm.valid) {
      this.validator.validateFormFields(this.authForm);
    } else {
      this.store.dispatch(new LogIn(payload));
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
