import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectCategoryState } from '@app/shared/ngrx-store/app.states';
import { FetchCategories, MoveCategory, DeleteCategoryFromList } from '@app/shared/ngrx-store/actions/category.actions';

@Component({
  selector: 'ct-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.scss']
})
export class EditCategoriesComponent implements OnInit, OnDestroy {

  categories: Array<any> = [];
  case_id: number;
  getState$: Observable<any>;
  errorMessage: string | null;
  subscription: Subscription;
  next_category: any;
  selected_category: any;

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
      this.categories = this.sortByProperty(this.categories, 'order_position');
    });
    this.subscription = this.route.params.subscribe(params => {
      this.case_id = +params['case_id'];
    });


    const payload = {
      filter_param: { 'id': this.case_id },
      sort_param: {'category_id': 1, field: 'order_position'},
      page_number: 1,
      items_per_page: 10
    };

    this.store.dispatch(new FetchCategories(payload));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  moveUp(index: number) {
    this.selected_category = this.categories[index];
    this.next_category = this.categories[index - 1];
    if (this.next_category) {
      const payload = {
        first_category: { id: this.selected_category.category_id, order_position: this.selected_category.order_position },
        second_category: { id: this.next_category.category_id, order_position: this.next_category.order_position },
        filter_param: { 'id': this.case_id },
        sort_param: {'category_id': 1, field: 'order_position'},
        page_number: 1,
        items_per_page: 10
      };
      this.store.dispatch(new MoveCategory(payload));
    }
  }

  moveDown(index: number) {
    this.selected_category = this.categories[index];
    this.next_category = this.categories[index + 1];
    if (this.next_category) {
      const payload = {
        first_category: { id: this.selected_category.category_id, order_position: this.selected_category.order_position },
        second_category: { id: this.next_category.category_id, order_position: this.next_category.order_position },
        filter_param: { 'id': this.case_id },
        sort_param: {'category_id': 1, field: 'order_position'},
        page_number: 1,
        items_per_page: 10
      };
      this.store.dispatch(new MoveCategory(payload));
    }
  }

  deleteCategory(index: number) {
    this.selected_category = this.categories[index];
    const payload = {
      category_id: this.selected_category.category_id,
      filter_param: { 'id': this.case_id },
      sort_param: {'category_id': 1, field: 'order_position'},
      page_number: 1,
      items_per_page: 10
    };
    this.store.dispatch(new DeleteCategoryFromList(payload));
  }

  getCategoryId(index: number) {
    return this.categories[index].category_id;
  }

  private sortByProperty(array, propertyName) {
    return array.sort(function (a, b) {
        return a[propertyName] - b[propertyName];
    });
  }
}
