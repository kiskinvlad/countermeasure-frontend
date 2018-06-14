import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs/';
import { User } from '@app/shared/models/user';
import { AppState, selectUserState } from '@app/shared/ngrx-store/app.states';
import { FetchUser, UpdateUser, CreateUser } from '@app/shared/ngrx-store/actions/user.actions';
import { ValidatorModule } from '@app/shared/form-validator/validator.module';

@Component({
  selector: 'ct-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.scss']
})
export class EditMemberComponent implements OnInit, OnDestroy {

  member: User = new User();
  getState$: Observable<any>;
  errorMessage: string | null;
  subscription: Subscription;
  memberForm: FormGroup;
  userID: number;
  orgID: number;
  validator: ValidatorModule;
  showErrorMsg = false;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.getState$ = this.store.select(selectUserState);
    this.createForm();
    this.validator = new ValidatorModule();
  }

  ngOnInit() {
    this.subscription = this.getState$.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      if (this.errorMessage === 'Cannot enable user.') {
        this.showErrorMsg = true;
        this.errorMessage = 'Cannot enable user. Member limit has been reached for this organization.';
      } else if (this.errorMessage === 'User already exists with that email.') {
        this.showErrorMsg = true;
      } else {
        this.showErrorMsg = false;
      }

      this.member = state.user;

      if (!this.errorMessage) {
        this.memberForm.reset();
      }
      if (this.userID) {
        this.setFormValues();
      }
    });

    this.route.params.subscribe(params => {
      this.userID = params['user_id'];
      if (this.userID) {
        // Password field is not required when updating a user
        this.memberForm.controls['password'].setValidators([]);
        this.getMember();
      }
    });

    this.route.parent.params.subscribe(params => {
      this.orgID = params['org_id'];
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createForm() {
    this.memberForm = this.fb.group ({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
      role: ['', Validators.required],
      enabled: ''
    });
  }

  onSubmit() {
    const formModel = this.memberForm.value;
    const data = {
      user_id: this.userID,
      org_id: this.orgID,
      first_name: formModel.firstName,
      last_name: formModel.lastName,
      email: formModel.email,
      password: formModel.password,
      role_id: formModel.role,
      enabled: +formModel.enabled
    };
    if (this.userID) {
      this.store.dispatch(new UpdateUser(data));
    } else {
      this.store.dispatch(new CreateUser(data));
    }
  }

  cancel() {
    this.location.back();
  }

  getMember(): void {
    this.store.dispatch(new FetchUser({user_id: this.userID}));
  }

  setFormValues() {
    if (!this.errorMessage && this.member) {
      this.memberForm.setValue({
        firstName: this.member.first_name,
        lastName: this.member.last_name,
        email: this.member.email,
        password: '',
        role: this.member.role_id,
        enabled: this.member.enabled
      });
    }
  }

}
