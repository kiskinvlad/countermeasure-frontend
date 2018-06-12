import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs/';
import { User } from '@app/shared/models/user';
import { Permission } from '@app/shared/models/permission';
import { AppState, selectUserState } from '@app/shared/ngrx-store/app.states';
import { FetchUser, UpdateUser, CreateUser, FetchPermissions, AddPermissions,
   DeletePermissions } from '@app/shared/ngrx-store/actions/user.actions';
import { ValidatorModule } from '@app/shared/form-validator/validator.module';

@Component({
  selector: 'ct-edit-guest',
  templateUrl: './edit-guest.component.html',
  styleUrls: ['./edit-guest.component.scss']
})
export class EditGuestComponent implements OnInit, OnDestroy {

  guest: User = new User();
  getState$: Observable<any>;
  errorMessage: string | null;
  subscription: Subscription;
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
      if (this.errorMessage === 'User already exists with that email.') {
        this.showErrorMsg = true;
      } else {
        this.showErrorMsg = false;
      }

      this.totalCount = state.totalCount;
      this.guest = state.user;
      this.permissions = state.permissions;

      if (!this.errorMessage && this.submitted) {
        this.guestForm.reset();
        this.submitted = false;
        if (!this.userID) {
          this.addGuestPermissions(this.guest.user_id);
        }
      }
      if (this.userID && !this.errorMessage && this.guestForm.pristine) {
        this.setFormValues();
      }
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
    const offset = (this.currentPage - 1) * this.itemsPerPage;
    const payload = {
      user_id: userID,
      org_id: this.orgID,
      offset: offset,
      limit: this.itemsPerPage,
      cases: JSON.stringify(this.addedCases),
      filter: this.filterParam,
      search: this.searchParam,
      sort_by: this.sortParam
    };

    this.store.dispatch(new AddPermissions(payload));
    this.addedCases = [];
  }

  removeGuestPermissions() {
    const offset = (this.currentPage - 1) * this.itemsPerPage;
    const payload = {
      user_id: this.userID,
      org_id: this.orgID,
      offset: offset,
      limit: this.itemsPerPage,
      cases: JSON.stringify(this.removedCases),
      filter: this.filterParam,
      search: this.searchParam,
      sort_by: this.sortParam
    };

    this.store.dispatch(new DeletePermissions(payload));
    this.removedCases = [];
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
