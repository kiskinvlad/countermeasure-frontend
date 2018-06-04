import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs/';
import { Store } from '@ngrx/store';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { AppState, selectDisputesState } from '@app/shared/ngrx-store/app.states';
import { AddEditTaxComponent } from './add-edit-tax/add-edit-tax.component';
import { FetchDisputesByCase, FetchDisputed, CreateDisputed, UpdateDisputed, RemoveDisputed } from '@app/shared/ngrx-store/actions/disputes.actions';

@Component({
  selector: 'ct-edit-taxes',
  templateUrl: './edit-taxes.component.html',
  styleUrls: ['./edit-taxes.component.scss']
})
export class EditTaxesComponent implements OnInit {

  private getState$: Observable<any>;
  private errorMessage: string | null;
  private subscription: Subscription;
  private next_category: any;
  private disputedDlgRef: BsModalRef;

  public disputed: Array<any> = [];
  public case_id: number;
  private dialogConfig = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false
  };


  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private addEditDlgService: BsModalService,
  ) {
    this.getState$ = this.store.select(selectDisputesState);
  }

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

  removeDisputed(index): void {
    var payload = {
      disputed_id: this.disputed[index]['disputed_t1_ta_id'],
      case_id: this.case_id
    }
    this.store.dispatch(new RemoveDisputed(payload));    
  }

  openAddTaxDialog(): void {
    this.disputedDlgRef = this.addEditDlgService.show(AddEditTaxComponent, this.dialogConfig);
    this.disputedDlgRef.content.dialogTitle = "Add Personal Income Tax Year in";
    this.disputedDlgRef.content.onCloseReason.subscribe(result => {
      if (result == 'submit') {
        var payload = {
          disputed: this.disputedDlgRef.content.disputed,
          case_id: this.case_id
        }
        this.store.dispatch(new CreateDisputed(payload));
      }
    });
  }

  openEditTaxDialog(index): void {

    this.disputedDlgRef = this.addEditDlgService.show(AddEditTaxComponent, this.dialogConfig);
    this.disputedDlgRef.content.disputed = this.disputed[index];
    this.disputedDlgRef.content.dialogTitle = "Edit Personal Income Tax Year in";
    this.disputedDlgRef.content.onCloseReason.subscribe(result => {
      if (result == 'save') {
        const payload = {
          disputed: this.disputedDlgRef.content.disputed
        }
        this.store.dispatch(new UpdateDisputed(payload));
      }
    });
  }
}
