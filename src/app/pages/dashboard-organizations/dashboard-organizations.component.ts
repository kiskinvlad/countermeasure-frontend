import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState, selectOrganizationState } from '@app/shared/ngrx-store/app.states';
import { FetchOrganizations } from '@app/shared/ngrx-store/actions/organization.actions';
import { User } from '@shared/models/user';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { DialogCreateOrgComponent } from './dialog-create-org/dialog-create-org.component';

@Component({
  selector: 'ct-dashboard-organizations',
  templateUrl: './dashboard-organizations.component.html',
  styleUrls: ['./dashboard-organizations.component.scss']
})
export class DashboardOrganizationsComponent implements OnInit, OnDestroy {

  private getState$: Observable<any>;
  private errorMessage: string | null;
  private subscription: Subscription;
  public itemsPerPage = 10;
  public organizations: Array<any> = [];
  public currentPage = 1;
  public previousPage = 0;
  public totalCount = 0;
  public searchForm: FormGroup;
  public searchVal: string | null;
  public searchBy: 'name';
  private createOrgModalRef: NgbModalRef;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.getState$ = this.store.select(selectOrganizationState);
    this.createForm();
  }

  ngOnInit() {
    this.subscription = this.getState$.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      this.organizations = state.organizations;
      this.totalCount = state.totalCount;
    });

    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
      offset: offset,
      limit: this.itemsPerPage,
      org_name: this.searchVal,
    };
    this.store.dispatch(new FetchOrganizations(payload));
  }

  createForm() {
    this.searchForm = this.fb.group ({
      searchVal: '',
      searchBy: 'name',
    });
  }

  onSubmit() {
    const formModel = this.searchForm.value;
    this.searchBy = formModel.searchBy;
    this.searchVal = formModel.searchVal;
    this.loadData();
  }

  onClickCreateOrganization() {
    this.modalService.open(DialogCreateOrgComponent, { size: 'sm' }).result.then((result) => {
      // Closed result
      if (result === 'Submit') {
        this.loadData();
      }
    }, (reason) => {
      // Dismissed reason
    });
  }
}
