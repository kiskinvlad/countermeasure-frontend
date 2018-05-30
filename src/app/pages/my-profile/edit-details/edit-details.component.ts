import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs/';
import { User } from '@app/shared/models/user';
import { AppState, selectUserState } from '@app/shared/ngrx-store/app.states';
import { FetchUser, UpdateUser } from '@app/shared/ngrx-store/actions/user.actions';

@Component({
  selector: 'ct-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.scss']
})
export class EditDetailsComponent implements OnInit, OnDestroy {

  user: User = new User();
  getState$: Observable<any>;
  errorMessage: string | null;
  subscription: Subscription;
  myProfileForm: FormGroup;

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.getState$ = this.store.select(selectUserState);
    this.createForm();
  }

  ngOnInit() {
    this.subscription = this.getState$.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      this.user = state.user;

      if (!this.errorMessage) {
        this.myProfileForm.reset();
      }
      this.setFormValues();
    });

    this.getUser();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createForm() {
    this.myProfileForm = this.fb.group ({
      firstName: '',
      lastName: '',
      phone: ''
    });
  }

  getUser(): void {
    this.store.dispatch(new FetchUser(null));
  }

  onSubmit() {
    const formModel = this.myProfileForm.value;
    const saveUser = {
      first_name: formModel.firstName,
      last_name: formModel.lastName,
      phone: formModel.phone
    };
    this.store.dispatch(new UpdateUser(saveUser));
  }

  setFormValues() {
    if (!this.errorMessage && this.user) {
      this.myProfileForm.setValue({
        firstName: this.user.first_name,
        lastName: this.user.last_name,
        phone: this.user.phone
      });
    }
  }

}
