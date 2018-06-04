import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectCategoryState } from '@app/shared/ngrx-store/app.states';
import { ActivatedRoute } from '@angular/router';
import { FetchCategories, CreateCategoriesSummaryCsv } from '@app/shared/ngrx-store/actions/category.actions';
import { Category } from '@app/shared/models/category';

@Component({
  selector: 'ct-summary-categories',
  templateUrl: './summary-categories.component.html',
  styleUrls: ['./summary-categories.component.scss']
})
export class SummaryCategoriesComponent implements OnInit {

  private getState$: Observable<any>;
  private errorMessage: string | null;
  private subscription: Subscription;
  public categories: Array<any> = [];
  public case_id: number;
  public total: number;
  public groupedCategories: Array<any> = [];
  public combinedCategories: Array<any> = [];
  public combinedCategoriesTotals: any = {};
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) {
      this.getState$ = this.store.select(selectCategoryState);
    }

  ngOnInit() {
    this.subscription = this.getState$.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      this.categories = (state.categories || []).map(item => {
        return {...item };
      });
      this.combinedCategories = this.createCombinedData(this.categories);
      this.groupedCategories = this.groupBy(this.categories, 'taxpayer', function(item) {
        return item.taxpayer;
      });
      this.calculateTotals(this.groupedCategories);
      this.calculateCombinedTotals(this.combinedCategories);
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

  private groupBy(array, param, f): any[] {
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
        taxable_income_total += +category.taxable_income;
        non_refundable_federal_tax_credits_total += +category.federal_non_refundable_tax_credits;
        non_refundable_provincial_tax_credits_total += +category.provincial_non_refundable_tax_credits;
        other_amounts_payable_total += +category.other_amounts_payable;
        credits_applied_on_filing_total += +category.credits_applied_on_filing;
        income_subject_to_gnp_total += + category.income_subject_to_gnp;
        other_penalties_total += + category.other_penalties;
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

  private calculateCombinedTotals(categories): void {
      let taxable_income_total = 0;
      let non_refundable_federal_tax_credits_total = 0;
      let non_refundable_provincial_tax_credits_total = 0;
      let other_amounts_payable_total = 0;
      let credits_applied_on_filing_total = 0;
      let income_subject_to_gnp_total = 0;
      let other_penalties_total = 0;
      categories.forEach((category) => {
        taxable_income_total +=
          +category.taxable_income_grouped || +category.taxable_income;
        non_refundable_federal_tax_credits_total +=
          +category.federal_non_refundable_tax_credits_grouped || +category.federal_non_refundable_tax_credits;
        non_refundable_provincial_tax_credits_total +=
          +category.provincial_non_refundable_tax_credits_grouped || +category.provincial_non_refundable_tax_credits;
        other_amounts_payable_total +=
          +category.other_amounts_payable_grouped || +category.other_amounts_payable;
        credits_applied_on_filing_total +=
          +category.credits_applied_on_filing_grouped || +category.credits_applied_on_filing;
        income_subject_to_gnp_total +=
          +category.income_subject_to_gnp_grouped || +category.income_subject_to_gnp;
        other_penalties_total +=
          +category.other_penalties_grouped || +category.other_penalties;
      });
      this.combinedCategoriesTotals['taxable_income_total'] = taxable_income_total;
      this.combinedCategoriesTotals['non_refundable_federal_tax_credits_total'] = non_refundable_federal_tax_credits_total;
      this.combinedCategoriesTotals['non_refundable_provincial_tax_credits_total'] = non_refundable_provincial_tax_credits_total;
      this.combinedCategoriesTotals['other_amounts_payable_total'] = other_amounts_payable_total;
      this.combinedCategoriesTotals['credits_applied_on_filing_total'] = credits_applied_on_filing_total;
      this.combinedCategoriesTotals['income_subject_to_gnp_total'] = income_subject_to_gnp_total;
      this.combinedCategoriesTotals['other_penalties_total'] = other_penalties_total;
  }

  private createCombinedData(categories: Array<any>): Array<any> {
    const output = [];
    categories.forEach(function(value) {
      const existing = output.filter(function(v, i) {
        return v.name === value.name;
      });
      if (existing.length) {
        const existingIndex = output.indexOf(existing[0]);
        output[existingIndex].taxable_income_grouped =
          +output[existingIndex].taxable_income + +value.taxable_income;
        output[existingIndex].federal_non_refundable_tax_credits_grouped =
          +output[existingIndex].federal_non_refundable_tax_credits + +value.federal_non_refundable_tax_credits;
        output[existingIndex].provincial_non_refundable_tax_credits_grouped =
          +output[existingIndex].provincial_non_refundable_tax_credits + +value.provincial_non_refundable_tax_credits;
        output[existingIndex].other_amounts_payable_grouped =
          +output[existingIndex].other_amounts_payable + +value.other_amounts_payable;
        output[existingIndex].credits_applied_on_filing_grouped =
          +output[existingIndex].credits_applied_on_filing + +value.credits_applied_on_filing;
        output[existingIndex].income_subject_to_gnp_grouped =
          +output[existingIndex].income_subject_to_gnp + +value.income_subject_to_gnp;
        output[existingIndex].other_penalties_grouped =
          +output[existingIndex].other_penalties + +value.other_penalties;
      } else {
        output.push(value);
      }
    });
    return output;
  }

  public create_csv(): void {
    const json = this.generateJsonForCvs(this.groupedCategories, this.combinedCategories, this.combinedCategoriesTotals);
    this.store.dispatch(new CreateCategoriesSummaryCsv({json: json, case_id: this.case_id}));
  }

  private generateJsonForCvs(gc, cc, cct): Array<any> {
    const groupedCategories = Object.assign([], gc);
    const combinedCategories = Object.assign([], cc);
    const combinedCategoriesTotals = Object.assign([], cct);
    const json = [];
    let categoryObj = {};
    let totalObj = {};
    groupedCategories.forEach((item) => {
      item.forEach((category) => {
        categoryObj['taxpayer'] = Object.assign({}, category).taxpayer;
        categoryObj['type'] = 'Personal Income Tax Returns';
        categoryObj['category'] = category.name;
        categoryObj['tax$'] = +category.taxable_income;
        categoryObj['penalties$'] = + category.other_penalties;
        categoryObj['federal_non_refundable_tax_credits$'] = +category.federal_non_refundable_tax_credits;
        categoryObj['provincial_non_refundable_tax_credits$'] = +category.provincial_non_refundable_tax_credits;
        categoryObj['other_amounts_payable$'] = +category.other_amounts_payable;
        categoryObj['credits_applied_on_filing$'] = +category.credits_applied_on_filing;
        categoryObj['income_subject_to_gnp$'] = + category.income_subject_to_gnp;
        json.push(Object.assign({}, categoryObj));
      });
      totalObj['taxpayer'] = item.taxpayer;
      totalObj['type'] = 'Personal Income Tax Returns';
      totalObj['category'] = 'Total';
      totalObj['tax$'] = +item.taxable_income_total;
      totalObj['penalties$'] = + item.other_penalties_total;
      totalObj['federal_non_refundable_tax_credits$'] = +item.non_refundable_federal_tax_credits_total;
      totalObj['provincial_non_refundable_tax_credits$'] = +item.non_refundable_provincial_tax_credits_total;
      totalObj['other_amounts_payable$'] = +item.other_amounts_payable_total;
      totalObj['credits_applied_on_filing$'] = +item.credits_applied_on_filing_total;
      totalObj['income_subject_to_gnp$'] = + item.income_subject_to_gnp_total;
      json.push(Object.assign({}, totalObj));
    });
    categoryObj = {};
    totalObj = {};
    combinedCategories.forEach((item) => {
      categoryObj['taxpayer'] = 'All taxpayers';
      categoryObj['type'] = 'All Tax Returns';
      categoryObj['category'] = item.name;
      categoryObj['tax$'] =
        +item.taxable_income_grouped || +item.taxable_income;
      categoryObj['penalties$'] =
        +item.other_penalties_grouped || +item.other_penalties;
      categoryObj['federal_non_refundable_tax_credits$'] =
        +item.federal_non_refundable_tax_credits_grouped || +item.federal_non_refundable_tax_credits;
      categoryObj['provincial_non_refundable_tax_credits$'] =
        +item.provincial_non_refundable_tax_credits_grouped || +item.provincial_non_refundable_tax_credits;
      categoryObj['other_amounts_payable$'] =
        +item.other_amounts_payable_grouped || +item.other_amounts_payable;
      categoryObj['credits_applied_on_filing$'] =
        +item.credits_applied_on_filing_grouped || +item.credits_applied_on_filing;
      categoryObj['income_subject_to_gnp$'] =
        +item.income_subject_to_gnp_grouped || +item.income_subject_to_gnp;
      json.push(Object.assign({}, categoryObj));
    });
    totalObj['taxpayer'] = 'All taxpayers';
    totalObj['type'] = 'All Tax Returns';
    totalObj['category'] = 'Total';
    totalObj['tax$'] = +combinedCategoriesTotals.taxable_income_total;
    totalObj['penalties$'] = +combinedCategoriesTotals.other_penalties_total;
    totalObj['federal_non_refundable_tax_credits$'] = +combinedCategoriesTotals.non_refundable_federal_tax_credits_total;
    totalObj['provincial_non_refundable_tax_credits$'] = +combinedCategoriesTotals.non_refundable_provincial_tax_credits_total;
    totalObj['other_amounts_payable$'] = +combinedCategoriesTotals.other_amounts_payable_total;
    totalObj['credits_applied_on_filing$'] = +combinedCategoriesTotals.credits_applied_on_filing_total;
    totalObj['income_subject_to_gnp$'] = +combinedCategoriesTotals.income_subject_to_gnp_total;
    json.push(Object.assign({}, totalObj));
    return json;
  }
}
