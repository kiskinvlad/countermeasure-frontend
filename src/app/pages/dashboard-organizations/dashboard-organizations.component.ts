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
/**
 * Dashboard organizations component
 * @implements {OnInit, OnDestroy}
 */
export class DashboardOrganizationsComponent implements OnInit, OnDestroy {
/**
 * @param {Array<any>} organizations Organizations array param
 * @param {Observable<any>} getState$ State observable param
 * @param {string | null} errorMessage Error message param
 * @param {Subscription} subscription Subscription param
 *
 * @param {number} itemsPerPage Organizations count per page param
 * @param {number} currentPage Page number param
 * @param {number} previousPage Previous page number param
 * @param {number} totalCount Organizations count param
 *
 * @param {FormGroup} formGroup Organization form group param
 * @param {string | null} searchVal Organization search value param
 * @param {string} searchBy Organization search key param
 * @param {NgbModalRef} createOrgModalRef Organization modal reference param
 */
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
/**
 * @constructor
 * @param {Store<AppState>} store App state store service
 * @param {ActivatedRoute} router App router service
 * @param {FormBuilder} fb Form builder service
 * @param {NgbModal} modalService Bootstrap modal service
 */
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.getState$ = this.store.select(selectOrganizationState);
    this.createForm();
  }
/**
 * Initialize dashboard-organizations component life cycle method
 */
  ngOnInit() {
    this.subscription = this.getState$.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      this.organizations = state.organizations;
      this.totalCount = state.totalCount;
    });

    this.loadData();
  }
/**
 * Destroy dashboard-organizations component life cycle method
 */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
/**
 * Get organizations array per page method
 */
  loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.loadData();
    }
  }
/**
 * Get organizations array method
 */
  loadData(): void {
    const offset = (this.currentPage - 1) * this.itemsPerPage;
    const payload = {
      offset: offset,
      limit: this.itemsPerPage,
      org_name: this.searchVal,
    };
    this.store.dispatch(new FetchOrganizations(payload));
  }
/**
 * Create form method
 */
  createForm(): void {
    this.searchForm = this.fb.group ({
      searchVal: '',
      searchBy: 'name',
    });
  }
/**
 * Form submit method
 */
  onSubmit() {
    const formModel = this.searchForm.value;
    this.searchBy = formModel.searchBy;
    this.searchVal = formModel.searchVal;
    this.loadData();
  }
/**
 * Open create organization modal method
 */
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
