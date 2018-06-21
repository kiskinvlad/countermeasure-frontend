import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs/';
import { User } from '@app/shared/models/user';
import { AppState, selectUserState } from '@app/shared/ngrx-store/app.states';
import { FetchUser, UpdateUser } from '@app/shared/ngrx-store/actions/user.actions';
import { LocalStorageService } from '@app/core/services/LocalStorageService/local-storage.service';

@Component({
  selector: 'ct-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.scss']
})
/**
 * Edit details component
 * @implements {OnInit, OnDestroy}
 */
export class EditDetailsComponent implements OnInit, OnDestroy {
/**
 * @param {User} user User model for edit-details param
 * @param {Observable<any>} getState$ State observable param
 * @param {string | null} errorMessage Error message param
 * @param {Subscription} subscription Subscription param
 * @param {FormGroup} myProfileForm Edit details form param
 * @param {number} userID Current user id param
 */
  user: User = new User();
  getState$: Observable<any>;
  errorMessage: string | null;
  subscription: Subscription;
  myProfileForm: FormGroup;
  userID: number;
/**
 * @constructor
 * @param {Store<AppState>} store App state store service
 * @param {FormBuilder} fb Edit details form builder service
 * @param {LocalStorageService} localStorageService Local storage service
 */
  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService
  ) {
    this.getState$ = this.store.select(selectUserState);
    this.userID = this.localStorageService.getUserID();
    this.createForm();
  }
/**
 * Initialize edit details component life cycle method
 */
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
/**
 * Destroy edit details component life cycle method
 */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
/**
 * Create form method
 */
  createForm() {
    this.myProfileForm = this.fb.group ({
      firstName: '',
      lastName: '',
      phone: ''
    });
  }
/**
 * Get current user method
 */
  getUser(): void {
    this.store.dispatch(new FetchUser({user_id: this.userID}));
  }
/**
 * Form submit method
 */
  onSubmit() {
    const formModel = this.myProfileForm.value;
    const saveUser = {
      first_name: formModel.firstName,
      last_name: formModel.lastName,
      phone: formModel.phone
    };
    this.store.dispatch(new UpdateUser(saveUser));
  }
/**
 * Set form values method
 */
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
