import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { LogOut } from '@app/shared/ngrx-store/actions/auth.actions';
import { Observable, Subscription } from 'rxjs/';
import { AppState, selectCasesState, selectOrganizationState } from '../../ngrx-store/app.states';
import { LocalStorageService } from '@app/core/services/LocalStorageService/local-storage.service';
import { FetchOrganization } from '@app/shared/ngrx-store/actions/organization.actions';
import { GetCase } from '@app/shared/ngrx-store/actions/cases.actions';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'ct-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit, OnDestroy {

  getState$: Observable<any>;
  getCaseState$: Observable<any>;
  getOrgState$: Observable<any>;
  errorMessage: string | null;
  subscription: Subscription;
  orgSubscription: Subscription;
  caseSubscription: Subscription;
  userName: string;
  userRole: string;
  userOrg: number;
  routeOrg: number;
  orgName: string;
  caseID: number;
  caseName: string;

  constructor(
    private store: Store<AppState>,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute,
  ) {
    this.getCaseState$ = this.store.select(selectCasesState);
    this.getOrgState$ = this.store.select(selectOrganizationState);
    this.userName = [this.localStorageService.getUserFirstName(),
      this.localStorageService.getUserLastName()].join(' ');
    this.userRole = this.localStorageService.getUserRoleID();
    this.userOrg = this.localStorageService.getUserOrgID();
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.caseID = params['case_id'];
      this.routeOrg = params['org_id'];
    });

    this.caseSubscription = this.getCaseState$.subscribe((state) => {
      if (!this.caseID) {
        this.caseName = null;
      } else {
        this.errorMessage = state.errorMessage;
        if (state.name) {
          this.caseName = state.name;
        } else if (!state.errorMessage) {
          this.getCase(this.caseID);
        }
      }
    });

    this.orgSubscription = this.getOrgState$.subscribe((state) => {
      if (this.userRole === 'CA' && !this.routeOrg) {
        this.orgName = null;
      } else {
        this.errorMessage = state.errorMessage;
        if (state.organization) {
          this.orgName = state.organization.org_name;
        } else if (!state.errorMessage && this.localStorageService.getAuthToken()) {
          this.getOrganization();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.caseSubscription.unsubscribe();
    this.orgSubscription.unsubscribe();
  }

  logOut() {
    this.store.dispatch(new LogOut());
  }

  getCase(caseID): void {
    this.store.dispatch(new GetCase({case_id: caseID}));
  }

  getOrganization(): void {
    let payload;
    if (this.userRole === 'CA') {
      payload = {org_id: this.routeOrg};
    } else {
      payload = {org_id: this.userOrg};
    }
    this.store.dispatch(new FetchOrganization(payload));
  }
}
