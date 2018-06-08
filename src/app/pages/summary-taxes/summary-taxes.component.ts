import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs/';
import { Store } from '@ngrx/store';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { AppState, selectDisputesState } from '@app/shared/ngrx-store/app.states';
import { FetchDisputesBySummary} from '@app/shared/ngrx-store/actions/disputes.actions';
import { CreateCsv } from '@app/shared/ngrx-store/actions/csv.actions';

@Component({
  selector: 'ct-summary-taxes',
  templateUrl: './summary-taxes.component.html',
  styleUrls: ['./summary-taxes.component.scss']
})
export class SummaryTaxesComponent implements OnInit {

  private getState$: Observable<any>;
  private errorMessage: string | null;
  private subscription: Subscription;

  public disputed: Array<any> = [];
  public case_id: number;

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
      this.disputed = (state.summaries).map(item => {
        return [...item];
      });
    });
    this.subscription = this.route.params.subscribe(params => {
      this.case_id = +params['case_id'];
    });

    const payload = {
      case_id: this.case_id
    };
    this.store.dispatch(new FetchDisputesBySummary(payload));
  }

  downloadCSV() {
    var json = JSON.stringify(this.disputed);
    this.store.dispatch(new CreateCsv({json: json, case_id: this.case_id, type: 'Taxes'}));
  }
}
