import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs/';
import { Store } from '@ngrx/store';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { AppState, selectDisputesState } from '@app/shared/ngrx-store/app.states';
import { AddEditTaxComponent } from './add-edit-tax/add-edit-tax.component';
import {
  FetchDisputesByCase,
  FetchDisputed,
  CreateDisputed,
  UpdateDisputed,
  RemoveDisputed
} from '@app/shared/ngrx-store/actions/disputes.actions';

@Component({
  selector: 'ct-edit-taxes',
  templateUrl: './edit-taxes.component.html',
  styleUrls: ['./edit-taxes.component.scss']
})
/**
 * Edit taxes component
 * @implements {OnInit, OnDestroy}
 */
export class EditTaxesComponent implements OnInit, OnDestroy {
/**
 * @param {Observable<any>} getState$ State observable param
 * @param {string | null} errorMessage Error message param
 * @param {Subscription} subscription Subscription param
 * @param {any} next_category Next scenario in list param
 * @param {BsModalRef} disputedDlgRef Bootstrap modal reference param
 * @param {object} dialogConfig Modal options param
 * @param {Array<any>} disputed Taxes array param
 * @param {number} case_id Current case id param
 */
  private getState$: Observable<any>;
  private errorMessage: string | null;
  private subscription: Subscription;
  private next_category: any;
  private disputedDlgRef: BsModalRef;
  private dialogConfig = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false
  };

  public disputed: Array<any> = [];
  public case_id: number;
/**
 * @constructor
 * @param {ActivatedRoute} route Current route state service
 * @param {Store<AppState>} store App state store service
 * @param {addEditDlgService} addEditDlgService Add edit dialog service
 */
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private addEditDlgService: BsModalService,
  ) {
    this.getState$ = this.store.select(selectDisputesState);
  }
/**
 * Initialize add-edit component life cycle method
 */
  ngOnInit() {
    this.subscription = this.getState$.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      console.log(state.disputes);
      this.disputed = (state.disputes || []).map(item => {
        return {...item };
      });
    });
    this.subscription = this.route.params.subscribe(params => {
      this.case_id = +params['case_id'];
    });

    const payload = {
      case_id: this.case_id
    };

    this.store.dispatch(new FetchDisputesByCase(payload));
  }
/**
 * Remove tax method
 * @param {number} index Tax index
 */
  removeDisputed(index: number): void {
    const payload = {
      disputed_id: this.disputed[index]['disputed_t1_ta_id'],
      case_id: this.case_id
    };

    this.store.dispatch(new RemoveDisputed(payload));
  }
/**
 * Open add tax modal method
 */
  openAddTaxDialog(): void {
    this.disputedDlgRef = this.addEditDlgService.show(AddEditTaxComponent, this.dialogConfig);
    this.disputedDlgRef.content.dialogTitle = 'Add Personal Income Tax Year in';
    this.disputedDlgRef.content.btn_remove = false;
    this.disputedDlgRef.content.onCloseReason.subscribe(result => {
      if (result === 'submit') {
        const payload = {
          disputed: this.disputedDlgRef.content.disputed,
          case_id: this.case_id
        };

        this.store.dispatch(new CreateDisputed(payload));
      }
    });
  }
/**
 * Open edit tax modal method
 * @param {number} index Tax index
 */
  openEditTaxDialog(index: number): void {

    this.disputedDlgRef = this.addEditDlgService.show(AddEditTaxComponent, this.dialogConfig);
    this.disputedDlgRef.content.disputed = this.disputed[index];
    this.disputedDlgRef.content.dialogTitle = 'Edit Personal Income Tax Year in';
    this.disputedDlgRef.content.onCloseReason.subscribe(result => {
      if (result === 'submit') {
        console.log(this.disputedDlgRef.content.disputed);
        const payload = {
          case_id: this.case_id,
          disputed: this.disputedDlgRef.content.disputed
        };

        this.store.dispatch(new UpdateDisputed(payload));
      } else if (result === 'remove') {
        this.removeDisputed(index);
      }
    });
  }

/**
 * Destroy edit-taxes component life cycle method
 */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
