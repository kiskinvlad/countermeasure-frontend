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
/**
 * Login component
 * @implements {OnInit, OnDestroy}
 */
export class LoginComponent implements OnInit, OnDestroy {
/**
 * @param {User} user User model for login param
 * @param {Observable<any>} getState$ State observable param
 * @param {string | null} errorMessage Error message param
 * @param {Subscription} subscription Subscription param
 * @param {FormGroup} authForm Authorization form param
 * @param {FormControl} email User email control param
 * @param {FormControl} password User password control param
 * @param {ValidatorModule} validator Form validator module param
 */
  user: User = new User();
  getState$: Observable<any>;
  errorMessage: string | null;
  subscription: Subscription;
  authForm: FormGroup;
  email: FormControl;
  password: FormControl;
  validator: ValidatorModule;
/**
 * @constructor
 * @param {Store<AppState>} store App state store service
 */
  constructor(
    private store: Store<AppState>
  ) {
    this.getState$ = this.store.select(selectAuthState);
  }
/**
 * Initialize login component life cycle method
 */
  ngOnInit() {
    this.subscription = this.getState$.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
    this.createFormControls();
    this.createForm();
    this.validator = new ValidatorModule();
  }
/**
 * Create form controls method
 */
  private createFormControls() {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[^ @]*@[^ @]*')
    ]);
    this.password = new FormControl('', [
      Validators.required,
    ]);
  }
/**
 * Create form method
 */
  private createForm() {
    this.authForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }
/**
 * User login method
 */
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
/**
 * Destroy login component life cycle method
 */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
