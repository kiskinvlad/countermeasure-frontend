import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectDisputesState, selectScenarioState, selectCsvState } from '@app/shared/ngrx-store/app.states';
import { ActivatedRoute } from '@angular/router';
import { FetchDisputesByCase } from '@app/shared/ngrx-store/actions/disputes.actions';
import { FetchSceneries } from '@app/shared/ngrx-store/actions/scenario.actions';
import { CreateCsv } from '@app/shared/ngrx-store/actions/csv.actions';

@Component({
  selector: 'ct-summary-scenarios',
  templateUrl: './summary-scenarios.component.html',
  styleUrls: ['./summary-scenarios.component.scss']
})
/**
 * Sumamry scenarios component.
 * @implements {OnInit, OnDestroy,}
 */
export class SummaryScenariosComponent implements OnInit, OnDestroy {
/**
 * @param {Observable<any>} getScenariosState$ Scenarios state observable param
 * @param {Observable<any>} getDisputesState$ Taxes state observable param
 * @param {string | null} errorMessage Error message param
 * @param {Subscription} subscription Subscription param
 * @param {Array<any>} scenarios Scenarios array param
 * @param {Array<any>} disputes Taxes array param
 * @param {number} case_id Current case id param
 * @param {number} total Total scenarios count param
 * @param {number} payable_income Tax payable income param
 * @param {number} payable_taxes Tax payable taxes param
 * @param {number} payable_penalties Tax payable penalties param
 * @param {number} payable_interest Tax payable interest param
 * @param {number} payable_total Tax payable total param
 * @param {number} remaining_amount_payable_total Tax remaining amount payable total param
 */
  private getScenariosState$: Observable<any>;
  private getDisputesState$: Observable<any>;
  private errorMessage: string | null;
  private subscription: Subscription;
  public scenarios: Array<any> = [];
  public disputes: Array<any> = [];
  public case_id: number;
  public total: number;
  public payable_income: number;
  public payable_taxes: number;
  public payable_penalties: number;
  public payable_interest: number;
  public payable_total: number;
  public remaining_amount_payable_total: number;
/**
 * @constructor
 * @param {ActivatedRoute} route Current route state service
 * @param {Store<AppState>} scenarioStore App scenario state store service
 * @param {Store<AppState>} disputesStore App taxes state store service
 */
  constructor(
    private scenarioStore: Store<AppState>,
    private disputesStore: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.getScenariosState$ = this.scenarioStore.select(selectScenarioState);
    this.getDisputesState$ = this.disputesStore.select(selectDisputesState);
   }
/**
 * Initialize sumamry scenario component life cycle method
 */
  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.case_id = params['case_id'];
    });
    this.subscription = this.getScenariosState$.subscribe((scenario_state) => {
      this.errorMessage = scenario_state.errorMessage;
      this.scenarios = (scenario_state.sceneries || null);
      this.subscription = this.getDisputesState$.subscribe((disputed_state) => {
        this.errorMessage = disputed_state.errorMessage;
        this.disputes = (disputed_state.disputes || null);
        this.payable_income = 0;
        this.payable_taxes = 0;
        this.payable_penalties = 0;
        this.payable_interest = 0;
        this.payable_total = 0;
        this.remaining_amount_payable_total = 0;
        this.disputes.forEach((tax) => {
          this.payable_income += +tax.DIFF_taxable_income;
          this.payable_taxes += +tax.DIFF_net_federal_tax + +tax.DIFF_net_provincial_tax;
          this.payable_penalties += +tax.DIFF_gross_negligence_penalty + +tax.DIFF_late_filing_penalty + +tax.DIFF_other_penalties;
          this.payable_interest += +tax.DIFF_estimated_interest;
          this.remaining_amount_payable_total += +tax.DIFF_total_tax_and_penalties + +tax.DIFF_estimated_interest;
        });
        this.payable_total += this.payable_taxes + this.payable_penalties + this.payable_interest;
        this.scenarios.forEach((scenario) => {
          scenario.total = +scenario.taxes + +scenario.penalties + +scenario.interest;
          scenario.payable_income = this.payable_income;
          scenario.payable_taxes = this.payable_taxes;
          scenario.payable_penalties = this.payable_penalties;
          scenario.payable_interest = this.payable_interest;
          scenario.payable_total = this.payable_total;
        });
      });
    });
    const payload = {
      filter_param: { 'id': this.case_id }
    };
    this.scenarioStore.dispatch(new FetchSceneries(payload));
    this.disputesStore.dispatch(new FetchDisputesByCase({case_id: this.case_id}));
  }
/**
 * Create comma separated values table method
 */
  public create_csv(): void {
    const json = this.generateJsonForCvs();
    this.scenarioStore.dispatch(new CreateCsv({json: json, case_id: this.case_id, type: 'scenario'}));
  }
/**
 * Create json data for comma separated value table method
 */
  private generateJsonForCvs() {
    const json = [];
    let scenarioObj = {};
    scenarioObj = {
      group: 'Amount In Dispute',
      total_payable$: this.remaining_amount_payable_total
    };
    json.push(scenarioObj);
    scenarioObj = {};
    this.scenarios.forEach((scenario) => {
      scenarioObj = {
        group: 'Proposed Scenarios',
        scenario_name: scenario.name,
        total_reduction_to_dept_income$: +scenario.taxable_income,
        remaining_amount_payable_income$: +scenario.payable_income,
        total_reduction_to_dept_taxes$: +scenario.taxes,
        remaining_amount_payable_taxes$: +scenario.payable_taxes,
        total_reduction_to_dept_penalties$: +scenario.penalties,
        remaining_amount_payable_penalties$: +scenario.payable_penalties,
        total_reduction_to_dept_interest$: +scenario.interest,
        remaining_amount_payable_interest$: +scenario.payable_interest,
        total_reduction_to_dept_total$: +scenario.total,
        remaining_amount_payable_total$: +scenario.payable_total
      };
    });
    json.push(scenarioObj);
    return json;
  }
/**
 * Destroy sumamry scenario component life cycle method
 */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
