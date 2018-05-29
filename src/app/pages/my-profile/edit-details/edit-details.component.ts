import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs/';
import { User } from '@app/shared/models/user';
import { AppState, selectUserState } from '@app/shared/ngrx-store/app.states';
import { FetchUser, UpdateUser } from '@app/shared/ngrx-store/actions/user.actions';
import { NotificationsService } from 'angular2-notifications';

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
  isUserUpdated: boolean;
  
  constructor(private store: Store<AppState>, private fb: FormBuilder, private notification: NotificationsService) {
    this.getState$ = this.store.select(selectUserState);
    this.createForm();
  }

  ngOnInit() {
    this.subscription = this.getState$.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      this.isUserUpdated = state.isUserUpdated;
      this.user = state.user;
      
      this.showNotifications();
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
    }
    this.store.dispatch(new UpdateUser(saveUser));
  }
  
  showNotifications() {
    if (this.errorMessage) {
      this.notification.error("Error", this.errorMessage);
    }
    if (this.isUserUpdated) {
      this.notification.success("Success", "Your details have been updated.");
      this.myProfileForm.reset();
    }
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

