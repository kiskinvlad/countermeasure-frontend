import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs/';
import { User } from '@app/shared/models/user';
import { AppState, selectUserState } from '@app/shared/ngrx-store/app.states';
import { UpdatePassword } from '@app/shared/ngrx-store/actions/user.actions';
import { ValidatorModule } from '@app/shared/form-validator/validator.module';

@Component({
  selector: 'ct-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
/**
 * Change password component
 * @implements {OnInit, OnDestroy}
 */
export class ChangePasswordComponent implements OnInit, OnDestroy {
/**
 * @param {Observable<any>} getState$ State observable param
 * @param {string | null} errorMessage Error message param
 * @param {Subscription} subscription Subscription param
 * @param {FormGroup} passwordForm Change password form param
 * @param {ValidatorModule} validator Form validator module param
 */
  getState$: Observable<any>;
  errorMessage: string | null;
  subscription: Subscription;
  passwordForm: FormGroup;
  confirmForm: FormGroup;
  validator: ValidatorModule;
/**
 * @constructor
 * @param {Store<AppState>} store App state store service
 * @param {FormBuilder} fb Edit details form builder service
 */
  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.getState$ = this.store.select(selectUserState);
    this.createForm();
    this.validator = new ValidatorModule();
  }
/**
 * Initialize change password component life cycle method
 */
  ngOnInit() {
    this.subscription = this.getState$.subscribe((state) => {
      this.errorMessage = state.errorMessage;

      if (!this.errorMessage) {
        this.passwordForm.reset();
      }
    });
  }
/**
 * Destroy change password component life cycle method
 */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
/**
 * Create form method
 */
  createForm() {
    this.passwordForm = this.fb.group({
      current: ['', Validators.required],
      passwords: this.fb.group({
        new: ['', Validators.required],
        repeat:   ['', Validators.required]
      }, {validator: this.matchValidator})
    });
  }
/**
 * Submit form method
 */
  onSubmit() {
    const formModel = this.passwordForm.value;
    const data = {
      old_password: formModel.current,
      new_password: formModel.passwords.new,
    };
    this.store.dispatch(new UpdatePassword(data));
  }
/**
 * Check password match method
 * @param {FormGroup} group Form group param
 * @return {boolean}
 */
  matchValidator(group: FormGroup): any {
    return group.get('new').value === group.get('repeat').value ? null : { mismatch: true };
  }

}
