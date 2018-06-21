import { Component, OnInit, OnDestroy } from '@angular/core';
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
/**
 * Sumamry taxes component.
 * @implements {OnInit, OnDestroy,}
 */
export class SummaryTaxesComponent implements OnInit, OnDestroy {
/**
 * @param {Observable<any>} getState$$ State observable param
 * @param {string | null} errorMessage Error message param
 * @param {Subscription} subscription Subscription param
 * @param {Array<any>} disputed Taxes array param
 * @param {number} case_id Current case id param
 */
  private getState$: Observable<any>;
  private errorMessage: string | null;
  private subscription: Subscription;

  public disputed: Array<any> = [];
  public case_id: number;
/**
 * @constructor
 * @param {ActivatedRoute} route Current route state service
 * @param {Store<AppState>} scenarioStore App state store service
 * @param {BsModalService} addEditDlgService Bootstrap modal service
 */
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private addEditDlgService: BsModalService,
  ) {
    this.getState$ = this.store.select(selectDisputesState);
  }
/**
 * Initialize sumamry taxes component life cycle method
 */
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
/**
 * Create comma separated values table method
 */
  downloadCSV() {
    const json = JSON.stringify(this.disputed);
    this.store.dispatch(new CreateCsv({json: json, case_id: this.case_id, type: 'Taxes'}));
  }

/**
 * Destroy sumamry taxes component life cycle method
 */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
