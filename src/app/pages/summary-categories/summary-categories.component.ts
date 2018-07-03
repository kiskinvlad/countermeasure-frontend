import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectCategoryState } from '@app/shared/ngrx-store/app.states';
import { ActivatedRoute } from '@angular/router';
import { FetchCategories } from '@app/shared/ngrx-store/actions/category.actions';
import { Category } from '@app/shared/models/category';
import { CreateCsv } from '@app/shared/ngrx-store/actions/csv.actions';

@Component({
  selector: 'ct-summary-categories',
  templateUrl: './summary-categories.component.html',
  styleUrls: ['./summary-categories.component.scss']
})
/**
 * Sumamry categories component.
 * @implements {OnInit, OnDestroy,}
 */
export class SummaryCategoriesComponent implements OnInit, OnDestroy {
/**
 * @param {Observable<any>} getState$ State observable param
 * @param {string | null} errorMessage Error message param
 * @param {Subscription} subscription Subscription param
 * @param {Array<any>} categories Categories array param
 * @param {number} case_id Current case id param
 * @param {number} total Total categories count param
 * @param {Array<any>} groupedCategories Grouped categories array param
 * @param {Array<any>} groupedCategoriesTotals Grouped categories totals array param
 * @param {Array<any>} combinedAndGroupedCategories Combined and grouped categories param
 * @param {any} combinedCategoriesTotals Combined categories totals object param
 */
  private getState$: Observable<any>;
  private errorMessage: string | null;
  private subscription: Subscription;
  public categories: Array<any> = [];
  public case_id: number;
  public total: number;
  public groupedCategories: Array<any> = [];
  public groupedCategoriesTotals: Array<any> = [];
  public combinedAndGroupedCategories: Array<any> = [];
  public combinedCategoriesTotals: any = {};
  public totals: any = {};
/**
 * @constructor
 * @param {ActivatedRoute} route Current route state service
 * @param {Store<AppState>} store App state store service
 */
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) {
      this.getState$ = this.store.select(selectCategoryState);
    }
/**
 * Initialize sumamry categories component life cycle method
 */
  ngOnInit() {
    this.subscription = this.getState$.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      this.categories = (state.categories || []).map(item => {
        return {...item };
      });
      this.groupedCategories = this.groupBy(this.categories, 'taxpayer', function(item) {
        return item.taxpayer;
      });
      this.combinedAndGroupedCategories = this.createCombinedData(this.groupedCategories);
      this.calculateTotals(this.combinedAndGroupedCategories);
      this.combinedCategoriesTotals = this.calculateCombinedTotals(Object.assign({}, this.categories));
    });
    this.subscription = this.route.params.subscribe(params => {
      this.case_id = +params['case_id'];
    });

    const payload = {
      filter_param: { 'id': this.case_id },
      sort_param: { field: 'order_position' }
    };
    this.store.dispatch(new FetchCategories(payload));
  }
/**
 * Group taxes by param method
 * @param {Array<any>} array Array to group
 * @param {string} param Param for group
 * @param {any} f Callback
 * @returns {any[]}
 */
  private groupBy(array: Array<any>, param: string, f: any): any[] {
    const groups = {};
    array.forEach( function( o ) {
      const group = JSON.stringify( f(o) );
      groups[group] = groups[group] || [];
      groups[group].push( o );
      groups[group][param] = o[param];
    });
    return Object.keys(groups).map( function( group ) {
      return groups[group];
    });
  }
/**
 * Calculate categories totals for table method
 */
  private calculateTotals(categories): void {
    categories.forEach((item) => {
      let taxable_income_total = 0;
      let non_refundable_federal_tax_credits_total = 0;
      let non_refundable_provincial_tax_credits_total = 0;
      let other_amounts_payable_total = 0;
      let credits_applied_on_filing_total = 0;
      let income_subject_to_gnp_total = 0;
      let other_penalties_total = 0;
      item.forEach((category) => {
        taxable_income_total +=
          +category.taxable_income_combined || +category.taxable_income;
        non_refundable_federal_tax_credits_total +=
          +category.federal_non_refundable_tax_credits_combined || +category.federal_non_refundable_tax_credits;
        non_refundable_provincial_tax_credits_total +=
          +category.provincial_non_refundable_tax_credits_combined || +category.provincial_non_refundable_tax_credits;
        other_amounts_payable_total +=
          +category.other_amounts_payable_combined || +category.other_amounts_payable;
        credits_applied_on_filing_total +=
          +category.credits_applied_on_filing_combined || +category.credits_applied_on_filing;
        income_subject_to_gnp_total +=
          + category.income_subject_to_gnp_combined || + category.income_subject_to_gnp;
        other_penalties_total +=
          + category.other_penalties_combined || + category.other_penalties;
      });
      item.taxable_income_total = taxable_income_total;
      item.non_refundable_federal_tax_credits_total = non_refundable_federal_tax_credits_total;
      item.non_refundable_provincial_tax_credits_total = non_refundable_provincial_tax_credits_total;
      item.other_amounts_payable_total = other_amounts_payable_total;
      item.credits_applied_on_filing_total = credits_applied_on_filing_total;
      item.income_subject_to_gnp_total = income_subject_to_gnp_total;
      item.other_penalties_total = other_penalties_total;
    });
  }
/**
 * Calculate combined categories totals for table method
 * @param {Array<any>} categories
 * @returns {Array<any>}
 */
  private calculateCombinedTotals(categories): Array<any>  {
    const output = [];
    const array = Object.assign([], categories);
    const obj = {};
    const total = {};

    total['taxable_income_total'] = 0;
    total['federal_non_refundable_tax_credits_total'] = 0;
    total['provincial_non_refundable_tax_credits_total'] = 0;
    total['other_amounts_payable_total'] = 0;
    total['credits_applied_on_filing_total'] = 0;
    total['income_subject_to_gnp_total'] = 0;
    total['other_penalties_total'] = 0;

    array.forEach((item) => {
      const name = item.name;
        if (!obj[name]) {
          obj[name] = item;
        } else {
          obj[name].taxable_income_total =
            + obj[name].taxable_income_total || +obj[name].taxable_income + +item.taxable_income ;
          obj[name].federal_non_refundable_tax_credits_total =
            + obj[name].federal_non_refundable_tax_credits_total ||
            + obj[name].federal_non_refundable_tax_credits + +item.federal_non_refundable_tax_credits;
          obj[name].provincial_non_refundable_tax_credits_total =
            + obj[name].provincial_non_refundable_tax_credits_total ||
            + obj[name].provincial_non_refundable_tax_credits + +item.provincial_non_refundable_tax_credits;
          obj[name].other_amounts_payable_total =
            + obj[name].other_amounts_payable_total || +obj[name].other_amounts_payable + +item.other_amounts_payable;
          obj[name].credits_applied_on_filing_total =
            + obj[name].credits_applied_on_filing_total || +obj[name].credits_applied_on_filing + +item.credits_applied_on_filing;
          obj[name].income_subject_to_gnp_total =
            + obj[name].income_subject_to_gnp_total || +obj[name].income_subject_to_gnp + +item.income_subject_to_gnp;
          obj[name].other_penalties_total =
            + obj[name].other_penalties_total || +obj[name].other_penalties + +item.other_penalties;
        }
    });
    Object.keys(obj).forEach((key) => {
      output.push(obj[key]);
    });
    output.forEach((item) => {
      total['taxable_income_total'] += item.taxable_income_total;
      total['federal_non_refundable_tax_credits_total'] += item.federal_non_refundable_tax_credits_total;
      total['provincial_non_refundable_tax_credits_total'] += item.provincial_non_refundable_tax_credits_total;
      total['other_amounts_payable_total'] += item.other_amounts_payable_total;
      total['credits_applied_on_filing_total'] += item.credits_applied_on_filing_total;
      total['income_subject_to_gnp_total'] += item.income_subject_to_gnp_total;
      total['other_penalties_total'] += item.other_penalties_total;
    });
    this.totals = total;
    return output;
  }
/**
 * Calculate combined categories data for table method
 * @param {Array<any>} categories
 * @returns {Array<any>}
 */
  private createCombinedData(categories: Array<any>): Array<any> {
    let output = [];
    const array = Object.assign([], categories);
    array.forEach((i) => {
      const obj = {};
      i.forEach((item) => {
        const name = item.name;
        if (!obj[name]) {
          obj[name] = item;
        } else {
          obj[name].taxable_income =
           +item.taxable_income + +obj[name].taxable_income;
          obj[name].federal_non_refundable_tax_credits =
           +obj[name].federal_non_refundable_tax_credits + +item.federal_non_refundable_tax_credits;
          obj[name].provincial_non_refundable_tax_credits =
           +obj[name].provincial_non_refundable_tax_credits + +item.provincial_non_refundable_tax_credits;
          obj[name].other_amounts_payable =
           +obj[name].other_amounts_payable + +item.other_amounts_payable;
          obj[name].credits_applied_on_filing =
           +obj[name].credits_applied_on_filing + +item.credits_applied_on_filing;
          obj[name].income_subject_to_gnp =
           +obj[name].income_subject_to_gnp + +item.income_subject_to_gnp;
          obj[name].other_penalties =
           +obj[name].other_penalties + +item.other_penalties;
        }
      });
      Object.keys(obj).forEach((key) => {
        output.push(obj[key]);
      });
    });
    output = this.groupBy(output, 'taxpayer', function(item) {
      return item.taxpayer;
    });
    return output;
  }
/**
 * Create comma separated values table method
 */
  public create_csv(): void {
    const json = this.generateJsonForCvs(this.combinedAndGroupedCategories, this.combinedCategoriesTotals, this.totals);
    this.store.dispatch(new CreateCsv({json: json, case_id: this.case_id, type: 'categories'}));
  }
/**
 * Create json data for comma separated value table method
 */
  private generateJsonForCvs(gc, cc, cct): Array<any> {
    const groupedCategories = Object.assign([], gc);
    const combinedCategories = Object.assign([], cc);
    const combinedCategoriesTotals = Object.assign([], cct);
    const json = [];
    let categoryObj = {};
    let totalObj = {};
    groupedCategories.forEach((item) => {
      item.forEach((category) => {
        categoryObj['Taxpayer'] = Object.assign({}, category).taxpayer;
        categoryObj['Type'] = 'Personal Income Tax Returns';
        categoryObj['Category Name'] = category.name;
        categoryObj['Taxable Income'] = +category.taxable_income;
        categoryObj['Other Penalties'] = + category.other_penalties;
        categoryObj['Non-refundable Federal Tax Credits'] = +category.federal_non_refundable_tax_credits;
        categoryObj['Non-refundable Provincial Tax Credits'] = +category.provincial_non_refundable_tax_credits;
        categoryObj['Other Amounts Payable'] = +category.other_amounts_payable;
        categoryObj['Credits Applied on Filing'] = +category.credits_applied_on_filing;
        categoryObj['Income Subject to GNP'] = + category.income_subject_to_gnp;
        json.push(Object.assign({}, categoryObj));
      });
      totalObj['Taxpayer'] = item.taxpayer;
      totalObj['Type'] = 'Personal Income Tax Returns';
      totalObj['Category Name'] = 'Total';
      totalObj['Taxable Income'] = +item.taxable_income_total;
      totalObj['Other Penalties'] = + item.other_penalties_total;
      totalObj['Non-refundable Federal Tax Credits'] = +item.non_refundable_federal_tax_credits_total;
      totalObj['Non-refundable Provincial Tax Credits'] = +item.non_refundable_provincial_tax_credits_total;
      totalObj['Other Amounts Payable'] = +item.other_amounts_payable_total;
      totalObj['Credits Applied on Filing'] = +item.credits_applied_on_filing_total;
      totalObj['Income Subject to GNP'] = + item.income_subject_to_gnp_total;
      json.push(Object.assign({}, totalObj));
    });
    categoryObj = {};
    totalObj = {};
    combinedCategories.forEach((item) => {
      categoryObj['Taxpayer'] = 'All taxpayers';
      categoryObj['Type'] = 'All Tax Returns';
      categoryObj['Category Name'] = item.name;
      categoryObj['Taxable Income'] =
        +item.taxable_income_total || +item.taxable_income;
      categoryObj['Other Penalties'] =
        +item.other_penalties_total || +item.other_penalties;
      categoryObj['Non-refundable Federal Tax Credits'] =
        +item.federal_non_refundable_tax_credits_total || +item.federal_non_refundable_tax_credits;
      categoryObj['Non-refundable Provincial Tax Credits'] =
        +item.provincial_non_refundable_tax_credits_total || +item.provincial_non_refundable_tax_credits;
      categoryObj['Other Amounts Payable'] =
        +item.other_amounts_payable_total || +item.other_amounts_payable;
      categoryObj['Credits Applied on Filing'] =
        +item.credits_applied_on_filing_total || +item.credits_applied_on_filing;
      categoryObj['Income Subject to GNP'] =
        +item.income_subject_to_gnp_total || +item.income_subject_to_gnp;
      json.push(Object.assign({}, categoryObj));
    });
    totalObj['Taxpayer'] = 'All taxpayers';
    totalObj['Type'] = 'All Tax Returns';
    totalObj['Category Name'] = 'Total';
    totalObj['Taxable Income'] = +combinedCategoriesTotals.taxable_income_total;
    totalObj['Other Penalties'] = +combinedCategoriesTotals.other_penalties_total;
    totalObj['Non-refundable Federal Tax Credits'] = +combinedCategoriesTotals.federal_non_refundable_tax_credits_total;
    totalObj['Non-refundable Provincial Tax Credits'] = +combinedCategoriesTotals.provincial_non_refundable_tax_credits_total;
    totalObj['Other Amounts Payable'] = +combinedCategoriesTotals.other_amounts_payable_total;
    totalObj['Credits Applied on Filing'] = +combinedCategoriesTotals.credits_applied_on_filing_total;
    totalObj['Income Subject to GNP'] = +combinedCategoriesTotals.income_subject_to_gnp_total;
    json.push(Object.assign({}, totalObj));
    return json;
  }
/**
 * Destroy sumamry categories component life cycle method
 */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
