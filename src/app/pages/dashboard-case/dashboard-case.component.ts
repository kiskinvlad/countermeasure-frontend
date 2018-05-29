import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs/';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { FetchCases, CreateCase } from '../../shared/ngrx-store/actions/cases.actions';
import { AppState, selectCasesState } from '../../shared/ngrx-store/app.states';
import { DialogCreateCaseComponent } from './dialog-create-case/dialog-create-case.component';

@Component({
  selector: 'ct-dashboard-case',
  templateUrl: './dashboard-case.component.html',
  styleUrls: ['./dashboard-case.component.scss']
})
export class DashboardCaseComponent implements OnInit, OnDestroy {

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
  private dialogConfig = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false
  };

  constructor(
    private detailDlgService: BsModalService,
    private store: Store<AppState>
  ) {
    this.getState$ = this.store.select(selectCasesState);
  }

  ngOnInit() {
    this.subscription = this.getState$.subscribe((state) => {
      this.total_count = state.totalCount;
      this.total_page = Math.ceil(state.totalCount / state.items_per_page);
      this.items_per_page = state.items_per_page;
      this.cases = (state.cases || []).map(item => {
        const last_updated_date = (new Date(item.updated_at))
          .toLocaleString('en-us', {weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'});
        const last_updated = last_updated_date + ' by ' + item.updated_by_name;
        return {...item, last_updated };
      });
      this.errorMessage = state.errorMessage;
    });
    this.filter_param = "All";
    this.sort_param = "Matter ID";
    this.page_number = 1;

    const payload = {
      filter_param: { 'id': 1 },
      sort_param: { 'id': 1, field: 'matter_id'},
      page_number: this.page_number,
      items_per_page: 2
    };
    this.store.dispatch(new FetchCases(payload));
  }

  openCreateCaseDialog(): void {
    this.createCaseDlgRef = this.detailDlgService.show(DialogCreateCaseComponent, this.dialogConfig);
    this.createCaseDlgRef.content.onCloseReason.subscribe(result => {
      if (result == 'submit') {
        const payload = {
          matter_id: this.createCaseDlgRef.content.formGroup.value.matter_id,
          name: this.createCaseDlgRef.content.formGroup.value.name,
          description: this.createCaseDlgRef.content.formGroup.value.description
        }
        this.store.dispatch(new CreateCase(payload));
      }
    })
  }

  openCopyCaseDialog(): void {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  range(): any[] {
    return Array.from(Array(Math.ceil(this.total_count/this.items_per_page)).keys());
  }

  getItems(): void {
    var tmp_sort_param = {};
    if (this.sort_param == 'Matter ID') {
      tmp_sort_param = {id: 1, field: 'matter_id'};
    } else if (this.sort_param == 'Name') {
      tmp_sort_param = {id: 2, field: 'name'};
    } else if (this.sort_param == 'Last Updated') {
      tmp_sort_param = {id: 3, field: 'updated_at'};
    } else {
      tmp_sort_param = {id: 4, field: 'matter_id'};
    }

    const payload = {
      filter_param: { 'id': this.filter_param == 'All' ? 1 : 2 },
      sort_param: tmp_sort_param,
      page_number: this.page_number,
      items_per_page: 2,
      search_name: this.search_name
    };

    this.store.dispatch(new FetchCases(payload));
  }

  getItemsByPage(page_no): boolean {
    if (page_no == 0 || page_no == Math.ceil(this.total_count/this.items_per_page) + 1) {
      return false;
    }
    this.page_number = page_no;
    this.getItems();
  }
}
