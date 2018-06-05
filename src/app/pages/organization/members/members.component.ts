import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectUserState, selectOrganizationState } from '@app/shared/ngrx-store/app.states';
import { FetchUsers } from '@app/shared/ngrx-store/actions/user.actions';
import { FetchOrganization } from '@app/shared/ngrx-store/actions/organization.actions';
import { User } from '@shared/models/user';

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
  public orgId: number;
  public itemsPerPage = 10;
  public members: Array<User> = [];
  public currentPage = 1;
  public previousPage = 1;
  public totalCount = 0;
  public totalEnabled: number;
  public memberLimit: number;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.getState$ = this.store.select(selectUserState);
    this.getOrgState$ = this.store.select(selectOrganizationState);
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
      }
    });

    this.route.parent.params.subscribe(params => {
      this.orgId = params['org_id'];
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
      org_id: this.orgId,
      offset: offset,
      limit: this.itemsPerPage,
      type: 'member'
    };
    this.store.dispatch(new FetchUsers(payload));
  }

  getOrganization(): void {
    this.store.dispatch(new FetchOrganization({org_id: this.orgId}));
  }

}
