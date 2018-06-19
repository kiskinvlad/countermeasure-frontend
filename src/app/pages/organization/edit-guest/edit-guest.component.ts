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
/**
 * Edit guest component
 * @implements {OnInit, OnDestroy}
 */
export class EditGuestComponent implements OnInit, OnDestroy {
/**
 * @param {User} guest User model for edit guest param
 * @param {Observable<any>} getState$ State observable param
 * @param {string | null} errorMessage Error message param
 * @param {string | null} permErrorMessage Permission error message param
 * @param {Subscription} subscription Subscription param
 * @param {Subscription} permSubscription Permission subscription param
 * @param {FormGroup} guestForm Edit guest form param
 * @param {number} userID Current user id param
 * @param {number} orgID Current organization id param
 * @param {ValidatorModule} validator Form validator module param
 * @param {boolean} showErrorMsg Error message state param
 * @param {Permission[]} permissions Permissions array param
 * @param {number} currentPage Current page number param
 * @param {number} previousPage Previous page number param
 * @param {number} totalCount Total count of users param
 * @param {number} itemsPerPage User count per page param
 * @param {Array<number>()} addedCases Added cases array param
 * @param {Array<number>()} removedCases Removed cases array param
 * @param {boolean} submited Form submited state param
 * @param {string | null} filterParam Filter for guests param
 * @param {string | null} searchParam Search condition for guests param
 * @param {string | null} sortParam Sort condition for guests param
 */
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
  itemsPerPage = 10;
  addedCases = Array<number>();
  removedCases = Array<number>();
  submitted = false;
  filterParam: string | null;
  searchParam: string | null;
  sortParam: string | null;
/**
 * @constructor
 * @param {Store<AppState>} store App state store service
 * @param {FormBuilder} fb Edit details form builder service
 * @param {ActivatedRoute} route Current route state service
 * @param {LocalStorageService} localStorageService Local storage service
 */
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
/**
 * Initialize edit-guest component life cycle method
 */
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
        if (this.submitted) {
          this.submitted = false;
          // Add permissions for newly created guest
          if (!this.userID && this.guest) {
            this.addGuestPermissions(this.guest.user_id);
          }
        }

        if (this.userID) {
          this.guestForm.reset();
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
/**
 * Destroy edit-guest component life cycle method
 */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.permSubscription.unsubscribe();
  }
/**
 * Create form method
 */
  createForm() {
    this.guestForm = this.fb.group ({
      firstName: '',
      lastName: '',
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
      enabled: 1,
      filterParam: 'all',
      searchParam: '',
      sortParam: 'matter_id'
    });
  }
/**
 * Form submit method
 */
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
/**
 * Add guest permissions method
 */
  addGuestPermissions(userID) {
    if (this.addedCases.length) {
      const payload = this.getPermissionsPayload(userID, this.addedCases);
      this.store.dispatch(new AddPermissions(payload));
      this.addedCases = [];
    }
  }
/**
 * Remove guest permissions method
 */
  removeGuestPermissions() {
    if (this.removedCases.length) {
      const payload = this.getPermissionsPayload(this.userID, this.removedCases);
      this.store.dispatch(new DeletePermissions(payload));
      this.removedCases = [];
    }
  }
/**
 * Get permissions http request payload method
 */
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
/**
 * Cencel form edit method
 */
  cancel() {
    this.location.back();
  }
/**
 * Get guest user method
 */
  getGuest(): void {
    this.store.dispatch(new FetchUser({user_id: this.userID}));
  }
/**
 * Initialize form data method
 */
  setFormValues() {
    if (!this.errorMessage && this.guest) {
      this.guestForm.patchValue({
        firstName: this.guest.first_name,
        lastName: this.guest.last_name,
        email: this.guest.email,
        password: '',
        enabled: this.guest.enabled,
        filterParam: this.filterParam,
        searchParam: this.searchParam,
        sortParam: this.sortParam
      });
    }
  }
/**
 * Load edit-guest component method
 */
  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.loadData();
    }
  }
/**
 * Load data for edit-guest component method
 */
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

/**
 * Change cases access method
 */
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
/**
 * Check cases access method
 */
  accessChecked(access, case_id) {
    const iAdded = this.addedCases.indexOf(parseInt(case_id, 10));
    const iRemoved = this.removedCases.indexOf(parseInt(case_id, 10));
    if (iAdded !== -1 || (access && iRemoved === -1)) {
      return true;
    }
    return false;
  }
/**
 * Save button state method
 */
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
