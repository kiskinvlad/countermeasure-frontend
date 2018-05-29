import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectCategoryState, selectDisputesState } from '@app/shared/ngrx-store/app.states';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { FetchCategory, DeleteCategory, UpdateCategory, CreateCategory } from '@app/shared/ngrx-store/actions/category.actions';
import { NgOption } from '@ng-select/ng-select';
import { FetchDisputes } from '@app/shared/ngrx-store/actions/disputes.actions';
import { Category } from '@app/shared/models/category';

@Component({
  selector: 'ct-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss']
})
export class AddEditCategoryComponent implements OnInit, OnDestroy {

  category: Category;
  case_id: number;
  type: string;
  category_id: number;
  getCategoryState$: Observable<any>;
  getDisputesState$: Observable<any>;
  errorMessage: string | null;
  subscription: Subscription;
  categoryForm: FormGroup;
  name: FormControl;
  income: FormControl;
  federal: FormControl;
  provincial: FormControl;
  other_amounts: FormControl;
  credits: FormControl;
  gnp: FormControl;
  other_penalties: FormControl;
  tax: FormControl;
  taxes: NgOption[];
  isFormTouched: boolean;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {
      this.isFormTouched = false;
      this.getCategoryState$ = this.store.select(selectCategoryState);
      this.getDisputesState$ = this.store.select(selectDisputesState);
      this.createFormControls();
      this.createForm();
    }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.category_id = +params['category_id'];
      this.case_id = params['case_id'];
      this.type = params['type'];
      if (this.category_id && this.type === 'add') {
        this.router.navigate(['/case', this.case_id, 'categories', 'add']);
      }
    });

    this.subscription = this.getCategoryState$.subscribe((category_state) => {
      this.errorMessage = category_state.errorMessage;
      this.category = (category_state.category || null);
      this.subscription = this.getDisputesState$.subscribe((disputed_state) => {
        this.errorMessage = disputed_state.errorMessage;
        this.taxes = (disputed_state.disputes || null);
        console.log(disputed_state);
        if (this.category && this.taxes) {
         this.setFormData();
        }
      });
    });

    if (this.category_id) {
      const payload = {
        category_id: this.category_id,
      };
      this.getFormData(payload);
    } else {

    }

    this.categoryForm.statusChanges.subscribe(() => {
      const controllersToCheck = [
        'name',
        'tax',
        'income',
        'federal',
        'provincial',
        'other_amounts',
        'credits',
        'gnp',
        'other_penalties'
      ];
      controllersToCheck.forEach(ctrlName => {
        const ctrl = this.categoryForm.get(ctrlName);
        if (ctrl.dirty || ctrl.touched) {
          this.isFormTouched = true;
        }
      });
    });
  }

  private createFormControls(): void {
    this.name = new FormControl('', [
      Validators.required,
    ]);
    this.tax = new FormControl('', [
      Validators.required
    ]);
    this.income = new FormControl('', [
      Validators.required
    ]);
    this.federal = new FormControl('', [
      Validators.required
    ]);
    this.provincial = new FormControl('', [
      Validators.required
    ]);
    this.other_amounts = new FormControl('', [
      Validators.required
    ]);
    this.credits = new FormControl('', [
      Validators.required
    ]);
    this.gnp = new FormControl('', [
      Validators.required
    ]);
    this.other_penalties = new FormControl('', [
      Validators.required
    ]);
  }

  private createForm(): void {
    this.categoryForm = new FormGroup({
      name: this.name,
      tax: this.tax,
      income: this.income,
      federal: this.federal,
      provincial: this.provincial,
      other_amounts: this.other_amounts,
      credits: this.credits,
      gnp: this.gnp,
      other_penalties: this.other_penalties
    });
  }

  private getFormData(payload: object): void {
    if (this.type === 'edit') {
      this.store.dispatch(new FetchCategory(payload));
    }
    this.store.dispatch(new FetchDisputes());
  }

  private setFormData(): void {
    const current_tax = this.taxes.find(tax => tax.disputed_t1_ta_id === this.category.disputed_t1_ta_id);
    this.name.setValue(this.category.name);
    this.income.setValue(this.category.taxable_income);
    this.federal.setValue(this.category.federal_non_refundable_tax_credits);
    this.provincial.setValue(this.category.provincial_non_refundable_tax_credits);
    this.gnp.setValue(this.category.income_subject_to_gnp);
    this.other_amounts.setValue(this.category.other_amounts_payable);
    this.credits.setValue(this.category.credits_applied_on_filing);
    this.other_penalties.setValue(this.category.other_penalties);
    if (current_tax) {
      this.tax.setValue(current_tax);
    }
  }

  deleteCategory(): void {
    const payload = {
      category_id: this.category_id
    };
    this.store.dispatch(new DeleteCategory(payload));
  }

  addUpdateCategory(): void {
    const payload = {
      name: this.categoryForm.get('name').value,
      tax:  this.categoryForm.get('tax').value,
      income: this.categoryForm.get('income').value,
      federal: this.categoryForm.get('federal').value,
      provincial: this.categoryForm.get('provincial').value,
      other_amounts: this.categoryForm.get('other_amounts').value,
      credits: this.categoryForm.get('credits').value,
      gnp: this.categoryForm.get('gnp').value,
      other_penalties: this.categoryForm.get('other_penalties').value,
      case_id: this.case_id
    };
    if (this.category_id) {
      payload['category_id'] = this.category_id;
      this.store.dispatch(new UpdateCategory(payload));
    } else {
      this.store.dispatch(new CreateCategory(payload));
    }
  }

  cancelEdit(): void {
    // route back
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
