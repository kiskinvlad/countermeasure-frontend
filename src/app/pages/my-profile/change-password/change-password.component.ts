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
export class ChangePasswordComponent implements OnInit, OnDestroy {

  getState$: Observable<any>;
  errorMessage: string | null;
  subscription: Subscription;
  passwordForm: FormGroup;
  confirmForm: FormGroup;
  validator: ValidatorModule;

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.getState$ = this.store.select(selectUserState);
    this.createForm();
    this.validator = new ValidatorModule();
  }

  ngOnInit() {
    this.subscription = this.getState$.subscribe((state) => {
      this.errorMessage = state.errorMessage;

      if (!this.errorMessage) {
        this.passwordForm.reset();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createForm() {
    this.passwordForm = this.fb.group({
      current: ['', Validators.required],
      passwords: this.fb.group({
        new: ['', Validators.required],
        repeat:   ['', Validators.required]
      }, {validator: this.matchValidator})
    });
  }

  onSubmit() {
    const formModel = this.passwordForm.value;
    const data = {
      old_password: formModel.current,
      new_password: formModel.passwords.new,
    };
    this.store.dispatch(new UpdatePassword(data));
  }

  matchValidator(group: FormGroup) {
    return group.get('new').value === group.get('repeat').value ? null : { mismatch: true };
  }

}
