import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs/';
import { User } from '@app/shared/models/user';
import { Permission } from '@app/shared/models/permission';
import { AppState, selectUserState, selectPermissionState } from '@app/shared/ngrx-store/app.states';
import { FetchUser, UpdateUser, CreateUser } from '@app/shared/ngrx-store/actions/user.actions';
import { FetchPermissions, AddPermissions, DeletePermissions } from '@app/shared/ngrx-store/actions/permission.actions';
import { ValidatorModule } from '@app/shared/form-validator/validator.module';

@Component({
  selector: 'ct-edit-guest',
  templateUrl: './edit-guest.component.html',
  styleUrls: ['./edit-guest.component.scss']
})
export class EditGuestComponent implements OnInit, OnDestroy {

  guest: User = new User();
  getState$: Observable<any>;
  getPermState$: Observable<any>;
  errorMessage: string | null;
  permErrorMessage: string | null;
  subscription: Subscription;
  permSubscription: Subscription;
  guestForm: FormGroup;
  userID: number;
  orgID: number;
  validator: ValidatorModule;
  showErrorMsg = false;
  permissions: Permission[];
  currentPage = 1;
  previousPage = 0;
  totalCount = 0;
  itemsPerPage = 2;
  addedCases = Array<number>();
  removedCases = Array<number>();
  submitted = false;
  filterParam: string | null;
  searchParam: string | null;
  sortParam: string | null;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.getState$ = this.store.select(selectUserState);
    this.getPermState$ = this.store.select(selectPermissionState);
    this.createForm();
    this.validator = new ValidatorModule();
  }

  ngOnInit() {
    this.subscription = this.getState$.subscribe((state) => {
      this.guest = state.user;
      this.errorMessage = state.errorMessage;
      if (this.errorMessage === 'User already exists with that email.') {
        this.showErrorMsg = true;
      } else {
        this.showErrorMsg = false;
      }

      if (!this.errorMessage) {
        this.guestForm.reset();

        if (this.submitted) {
          this.submitted = false;
          // Add permissions for newly created guest
          if (!this.userID && this.guest) {
            this.addGuestPermissions(this.guest.user_id);
          }
        }

        if (this.userID) {
          this.setFormValues();
        }
      }
    });

    this.permSubscription = this.getPermState$.subscribe((state) => {
      this.permErrorMessage = state.errorMessage;
      this.totalCount = state.totalCount;
      this.permissions = state.permissions;
    });

    this.route.params.subscribe(params => {
      this.userID = params['user_id'];
      if (this.userID) {
        // Password field is not required when updating a user
        this.guestForm.controls['password'].setValidators([]);
        this.getGuest();
      }
    });

    this.route.parent.params.subscribe(params => {
      this.orgID = params['org_id'];
    });

    if (this.orgID) {
      this.loadData();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createForm() {
    this.guestForm = this.fb.group ({
      firstName: '',
      lastName: '',
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
      enabled: '',
      filterParam: 'all',
      searchParam: '',
      sortParam: 'matter_id'
    });
  }

  onSubmit() {
    this.submitted = true;
    const formModel = this.guestForm.value;
    const data = {
      user_id: this.userID,
      org_id: this.orgID,
      first_name: formModel.firstName,
      last_name: formModel.lastName,
      email: formModel.email,
      password: formModel.password,
      role_id: 'OG',
      enabled: +formModel.enabled
    };
    if (this.userID) {
      this.store.dispatch(new UpdateUser(data));
      this.addGuestPermissions(this.userID);
      this.removeGuestPermissions();
    } else {
      this.store.dispatch(new CreateUser(data));
    }
  }

  addGuestPermissions(userID) {
    if (this.addedCases.length) {
      const payload = this.getPermissionsPayload(userID, this.addedCases);
      this.store.dispatch(new AddPermissions(payload));
      this.addedCases = [];
    }
  }

  removeGuestPermissions() {
    if (this.removedCases.length) {
      const payload = this.getPermissionsPayload(this.userID, this.removedCases);
      this.store.dispatch(new DeletePermissions(payload));
      this.removedCases = [];
    }
  }

  getPermissionsPayload(userID, cases) {
    const offset = (this.currentPage - 1) * this.itemsPerPage;
    const payload = {
      user_id: userID,
      org_id: this.orgID,
      offset: offset,
      limit: this.itemsPerPage,
      cases: JSON.stringify(cases),
      filter: this.filterParam,
      search: this.searchParam,
      sort_by: this.sortParam
    };
    return payload;
  }

  cancel() {
    this.location.back();
  }

  getGuest(): void {
    this.store.dispatch(new FetchUser({user_id: this.userID}));
  }

  setFormValues() {
    if (!this.errorMessage && this.guest) {
      this.guestForm.patchValue({
        firstName: this.guest.first_name,
        lastName: this.guest.last_name,
        email: this.guest.email,
        password: '',
        enabled: this.guest.enabled
      });
    }
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.loadData();
    }
  }

  loadData() {
    const offset = (this.currentPage - 1) * this.itemsPerPage;
    const payload = {
      user_id: this.userID,
      org_id: this.orgID,
      offset: offset,
      limit: this.itemsPerPage,
      filter: this.filterParam,
      search: this.searchParam,
      sort_by: this.sortParam
    };
    this.store.dispatch(new FetchPermissions(payload));
  }

  // Update arrays of added/removed cases
  changeAccess($event) {
    const isChecked = $event.target.checked;
    const caseID = parseInt($event.target.name, 10);

    let i;
    if (isChecked) {
      i = this.removedCases.indexOf(caseID);
      if (i === -1) {
        this.addedCases.push(caseID);
      } else {
        this.removedCases.splice(i, 1);
      }
    } else {
      i = this.addedCases.indexOf(caseID);
      if (i === -1) {
        this.removedCases.push(caseID);
      } else {
        this.addedCases.splice(i, 1);
      }
    }
  }

  accessChecked(access, case_id) {
    const iAdded = this.addedCases.indexOf(parseInt(case_id, 10));
    const iRemoved = this.removedCases.indexOf(parseInt(case_id, 10));
    if (iAdded !== -1 || (access && iRemoved === -1)) {
      return true;
    }
    return false;
  }

  isSaveDisabled() {
    return !this.guestForm.valid || (!this.addedCases.length && !this.removedCases.length
      && this.guestForm.pristine);
  }

  searchPermissions(event) {
    const formModel = this.guestForm.value;
    this.searchParam = this.guestForm.value.searchParam;
    this.loadData();
  }

  onChangeFilter($event) {
    const formModel = this.guestForm.value;
    this.filterParam = this.guestForm.value.filterParam;
    this.loadData();
  }

  onChangeSort($event) {
    const formModel = this.guestForm.value;
    this.sortParam = this.guestForm.value.sortParam;
    this.loadData();
  }
}
