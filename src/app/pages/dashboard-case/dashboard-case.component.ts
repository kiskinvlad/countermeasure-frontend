import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs/';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { FetchCases, CreateCase, DeleteCase } from '../../shared/ngrx-store/actions/cases.actions';
import { AppState, selectCasesState } from '../../shared/ngrx-store/app.states';
import { DialogCreateCaseComponent } from './dialog-create-case/dialog-create-case.component';

@Component({
  selector: 'ct-dashboard-case',
  templateUrl: './dashboard-case.component.html',
  styleUrls: ['./dashboard-case.component.scss']
})
/**
 * Dashboard case component
 * @implements {OnInit, OnDestroy}
 */
export class DashboardCaseComponent implements OnInit, OnDestroy {
/**
 * @param {Array<any>} cases Cases array param
 * @param {Observable<any>} getState$ State observable param
 * @param {string | null} errorMessage Error message param
 * @param {Subscription} subscription Subscription param
 *
 * @param {number} page_number Current page number param
 * @param {string} filter_param Filter param for fetch cases param
 * @param {string} sort_param Sort param for cases param
 * @param {string} search_name Case name param
 *
 * @param {BsModalRef} createCaseDlgRef Bootstrap modal reference param
 * @param {number} total_count Cases count param
 * @param {number} total_page Page count param
 * @param {number} items_per_page Items count per page param
 * @param {string} user_role User role param
 * @param {number} default_items_per_page Items count per page param
 * @param {boolean} flag_page_no flag for page number updated
 * @param {object} dialogConfig Bootstrap modal dialog options param
 */
  public cases: Array<any> = [];
  getState$: Observable<any>;
  errorMessage: string | null;
  subscription: Subscription;

  public page_number: number;
  public filter_param: string;
  public sort_param: string;
  public search_name: string;

  private createCaseDlgRef: BsModalRef;
  private total_count: number;
  private total_page: number;
  private items_per_page: number;
  private user_role: string;
  private default_items_per_page: number;
  private flag_page_no: boolean;
  private dialogConfig = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false
  };
/**
 * @constructor
 * @param {Router} router App router service
 * @param {BsModalService} detailDlgService Bootstrap modal service
 * @param {Store<AppState>} store App state store service
 */
  constructor(
    private router: Router,
    private detailDlgService: BsModalService,
    private store: Store<AppState>
  ) {
    this.default_items_per_page = 10;
    this.flag_page_no = false;
    this.getState$ = this.store.select(selectCasesState);
  }
/**
 * Initialize dashboard-case component life cycle method
 */
  ngOnInit(): void {
    this.subscription = this.getState$.subscribe((state) => {
      this.total_count = state.totalCount;
      this.total_page = Math.ceil(state.totalCount / state.items_per_page);
      this.items_per_page = state.items_per_page;
      this.user_role = state.role_id;
      this.cases = (state.cases || []).map(item => {
        const last_updated_date = (new Date(item.updated_at))
          .toLocaleString('en-us', {weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'});
        const last_updated = last_updated_date + ' by ' + item.updated_by_name;
        return {...item, last_updated };
      });
      this.errorMessage = state.errorMessage;
    });
    this.filter_param = 'All';
    this.sort_param = 'Matter ID';
    this.page_number = 1;

    const payload = {
      filter_param: { 'id': 1 },
      sort_param: { 'id': 1, field: 'matter_id'},
      page_number: this.page_number,
      items_per_page: this.default_items_per_page
    };
    this.store.dispatch(new FetchCases(payload));
  }
/**
 * Open create case dialog method
 */
  openCreateCaseDialog(): void {
    this.createCaseDlgRef = this.detailDlgService.show(DialogCreateCaseComponent, this.dialogConfig);
    this.createCaseDlgRef.content.dialogTitle = 'Create Case';
    this.createCaseDlgRef.content.onCloseReason.subscribe(result => {
      if (result === 'submit') {
        const payload = {
          matter_id: this.createCaseDlgRef.content.formGroup.value.matter_id,
          name: this.createCaseDlgRef.content.formGroup.value.name,
          description: this.createCaseDlgRef.content.formGroup.value.description,
          filter_param: { 'id': this.filter_param === 'All' ? 1 : 2 },
          sort_param: this.sort_param,
          page_number: this.page_number,
          items_per_page: this.default_items_per_page,
          search_name: this.search_name
        };
        this.store.dispatch(new CreateCase(payload));
      }
    });
  }
/**
 * Open copy case dialog method
 * @param {number} i Case index
 */
  openCopyCaseDialog(i: number): void {
    this.createCaseDlgRef = this.detailDlgService.show(DialogCreateCaseComponent, this.dialogConfig);
    this.createCaseDlgRef.content.dialogTitle = 'Copy Case - Copying Matter ' + this.cases[i].matter_id + ', ' + this.cases[i].name;
    this.createCaseDlgRef.content.formGroup.setValue({
      matter_id: this.cases[i].matter_id,
      name: '',
      description: ''
    });
    this.createCaseDlgRef.content.onCloseReason.subscribe(result => {

      if (result === 'submit') {
        const payload = {
          matter_id: this.createCaseDlgRef.content.formGroup.value.matter_id,
          name: this.createCaseDlgRef.content.formGroup.value.name,
          description: this.createCaseDlgRef.content.formGroup.value.description,
          filter_param: { 'id': this.filter_param === 'All' ? 1 : 2 },
          sort_param: this.sort_param,
          page_number: this.page_number,
          items_per_page: this.default_items_per_page,
          search_name: this.search_name
        };
        this.store.dispatch(new CreateCase(payload));
      }
    });
  }
  
/**
 * Redirect to detail component method
 * @param {number} i Case index
 */
  redirectToDetail(index): void {
    this.router.navigate(['/case/' + (this.cases[index].case_id) + '/detail']);
  }
/**
 * Delete case method
 * @param {number} i Case index
 */
  deleteCase(i: number): void {
    const payload = {
      filter_param: { 'id': this.filter_param === 'All' ? 1 : 2 },
      sort_param: this.sort_param,
      page_number: this.page_number,
      items_per_page: this.default_items_per_page,
      search_name: this.search_name,
      case_id: this.cases[i].case_id
    };
    console.log(payload);
    this.store.dispatch(new DeleteCase(payload));
  }
/**
 * Destroy dashboard-case component life cycle method
 */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
/**
 * Get cases array per page method
 * @returns {any[]}
 */
  range(): any[] {
    return Array.from(Array(Math.ceil(this.total_count / this.items_per_page)).keys());
  }
/**
 * Get cases array method
 */
  getItems(): void {
    const payload = {
      filter_param: { 'id': this.filter_param === 'All' ? 1 : 2 },
      sort_param: this.sort_param,
      page_number: this.flag_page_no ? this.page_number : 1,
      items_per_page: this.default_items_per_page,
      search_name: this.search_name
    };
    this.page_number = this.flag_page_no ? this.page_number : 1;
    this.flag_page_no = false;
    this.store.dispatch(new FetchCases(payload));
  }
/**
 * Get cases per page array method
 * @param {number} page_no Page number
 * @returns {boolean}
 */
  getItemsByPage(page_no: number): boolean {
    if (page_no === 0 || page_no === Math.ceil(this.total_count / this.items_per_page) + 1) {
      return false;
    }
    this.flag_page_no = true;
    this.page_number = page_no;
    this.getItems();
  }
}
