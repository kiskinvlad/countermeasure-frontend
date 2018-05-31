import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectCategoryState } from '@app/shared/ngrx-store/app.states';
import { ActivatedRoute } from '@angular/router';
import { FetchCategories } from '@app/shared/ngrx-store/actions/category.actions';
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

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) {
      this.getState$ = this.store.select(selectCategoryState);
    }

  ngOnInit() {
    this.subscription = this.getState$.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      this.categories = (state.categories || []).map(item => {
        return {...item };
      });
      this.categories = this.groupBy(this.categories, 'taxpayer', function(item) {
        return item.taxpayer;
      });
      this.calculateTotals();
    });
    this.subscription = this.route.params.subscribe(params => {
      this.case_id = +params['case_id'];
    });

    const payload = {
      filter_param: { 'id': this.case_id },
      sort_param: {'category_id': 1, field: 'order_position'}
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

  private calculateTotals(): void {
    this.categories.forEach((item) => {
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

}
