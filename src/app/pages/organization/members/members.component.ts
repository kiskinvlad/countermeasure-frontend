import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectUserState, selectOrganizationState } from '@app/shared/ngrx-store/app.states';
import { FetchUsers } from '@app/shared/ngrx-store/actions/user.actions';
import { FetchOrganization, UpdateOrganization } from '@app/shared/ngrx-store/actions/organization.actions';
import { User } from '@shared/models/user';
import { LocalStorageService } from '@app/core/services/LocalStorageService/local-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ct-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit, OnDestroy {

  private getState$: Observable<any>;
  private getOrgState$: Observable<any>;
  private errorMessage: string | null;
  private subscription: Subscription;
  private orgSubscription: Subscription;
  public orgID: number;
  public itemsPerPage = 10;
  public members: Array<User> = [];
  public currentPage = 1;
  public previousPage = 1;
  public totalCount = 0;
  public totalEnabled: number;
  public memberLimit: number;
  public roleID: string;
  public orgForm: FormGroup;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder
  ) {
    this.getState$ = this.store.select(selectUserState);
    this.getOrgState$ = this.store.select(selectOrganizationState);
    this.roleID = localStorageService.getUserRoleID();
    this.createForm();
  }

  ngOnInit() {
    this.subscription = this.getState$.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      this.members = state.users;
      this.totalCount = state.totalCount;
      this.totalEnabled = state.totalEnabled;
    });

    this.orgSubscription = this.getOrgState$.subscribe((state) => {
      if (state.organization) {
        this.memberLimit = state.organization.member_limit;
        if (!this.errorMessage) {
          this.orgForm.reset();
        }
        this.setFormValues();
      }
    });

    this.route.parent.params.subscribe(params => {
      this.orgID = params['org_id'];
      this.getOrganization();
    });

    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.orgSubscription.unsubscribe();
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
      org_id: this.orgID,
      offset: offset,
      limit: this.itemsPerPage,
      type: 'member'
    };
    this.store.dispatch(new FetchUsers(payload));
  }

  getOrganization(): void {
    this.store.dispatch(new FetchOrganization({org_id: this.orgID}));
  }

  createForm() {
    this.orgForm = this.fb.group ({
      memberLimit: ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]]
    });
  }

  onSubmit() {
    const formModel = this.orgForm.value;
    const data = {
      org_id: this.orgID,
      member_limit: formModel.memberLimit
    };
    this.store.dispatch(new UpdateOrganization(data));
  }

  setFormValues() {
    if (this.memberLimit) {
      this.orgForm.setValue({
        memberLimit: this.memberLimit
      });
    }
  }
}
