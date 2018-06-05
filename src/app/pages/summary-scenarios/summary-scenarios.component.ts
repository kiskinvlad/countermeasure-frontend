import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectDisputesState } from '@app/shared/ngrx-store/app.states';
import { ActivatedRoute } from '@angular/router';
import { FetchDisputesByCase } from '@app/shared/ngrx-store/actions/disputes.actions';

@Component({
  selector: 'ct-summary-scenarios',
  templateUrl: './summary-scenarios.component.html',
  styleUrls: ['./summary-scenarios.component.scss']
})
export class SummaryScenariosComponent implements OnInit {

  private getScenariosState$: Observable<any>;
  private getDisputesState$: Observable<any>;
  private errorMessage: string | null;
  private subscription: Subscription;
  public scenarios: Array<any> = [];
  public disputes: Array<any> = [];
  public case_id: number;
  public total: number;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.getScenariosState$ = this.store.select(selectScenarioState);
    this.getDisputesState$ = this.store.select(selectDisputesState);
   }

  ngOnInit() {
    this.subscription = this.getScenariosState$.subscribe((scenario_state) => {
      this.errorMessage = scenario_state.errorMessage;
      this.scenarios = (scenario_state.scenarios || null);
      this.subscription = this.getDisputesState$.subscribe((disputed_state) => {
        this.errorMessage = disputed_state.errorMessage;
        this.disputes = (disputed_state.disputes || null);
      });
    });
    const payload = {
      case_id: this.case_id
    };
    this.store.dispatch(new FetchScenarios(payload));
    this.store.dispatch(new FetchDisputesByCase(payload));
  }

}
