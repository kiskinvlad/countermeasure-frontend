import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectCategoryState } from '@app/shared/ngrx-store/app.states';
import { FetchCategories, MoveCategory, DeleteCategoryFromList, CreateCategory } from '@app/shared/ngrx-store/actions/category.actions';

@Component({
  selector: 'ct-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.scss']
})
/**
 * Edit categories component
 * @implements {OnInit, OnDestroy}
 */
export class EditCategoriesComponent implements OnInit, OnDestroy {
/**
 * @param {Array<any>} categories Categories array param
 * @param {any} next_category Next category in list param
 * @param {any} selected_category Selected category in list
 * @param {Observable<any>} getState$ State observable param
 * @param {string | null} errorMessage Error message param
 * @param {Subscription} subscription Subscription param
 * @param {number} case_id Current case id param
 * @param {number} total_count Categories count param
 * @param {number} items_per_page Categories count per page param
 * @param {number} page_number Current page number param
 * @param {number} total_page Pages count param
 */
  private getState$: Observable<any>;
  private errorMessage: string | null;
  private subscription: Subscription;
  private next_category: any;
  private selected_category: any;
  public categories: Array<any> = [];
  public case_id: number;
  public total_count: number;
  public items_per_page: number;
  public page_number: number;
  public total_page: number;
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
 * Initialize edit-categories component life cycle method
 */
  ngOnInit() {
    this.subscription = this.getState$.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      this.total_count = state.totalCount;
      this.items_per_page = state.items_per_page;
      this.page_number = state.page_number;
      this.total_page = Math.ceil(state.totalCount / state.items_per_page);
      this.categories = (state.categories || []).map(item => {
        return {...item };
      });
      this.categories = this.sortByProperty(this.categories, 'order_position');
    });
    this.subscription = this.route.params.subscribe(params => {
      this.case_id = +params['case_id'];
    });

    const payload = this.getCategoryPayload();
    this.store.dispatch(new FetchCategories(payload));
  }
/**
 * Move up category method
 * @param {number} index Current category index
 */
  private moveUp(index: number): void {
    this.selected_category = this.categories[index];
    this.next_category = this.categories[index - 1];
    if (this.next_category) {
      const payload = this.getCategoryPayload();
      payload['first_category'] = { id: this.selected_category.category_id, order_position: this.selected_category.order_position },
      payload['second_category'] = { id: this.next_category.category_id, order_position: this.next_category.order_position },
      this.store.dispatch(new MoveCategory(payload));
    }
  }
/**
 * Move down category method
 * @param {number} index Current category index
 */
  private moveDown(index: number): void {
    this.selected_category = this.categories[index];
    this.next_category = this.categories[index + 1];
    if (this.next_category) {
      const payload = this.getCategoryPayload();
      payload['first_category'] = { id: this.selected_category.category_id, order_position: this.selected_category.order_position },
      payload['second_category'] = { id: this.next_category.category_id, order_position: this.next_category.order_position },
      this.store.dispatch(new MoveCategory(payload));
    }
  }
/**
 * Delete category method
 * @param {number} index Current category index
 */
  private deleteCategory(index: number): void {
    this.selected_category = this.categories[index];
    const payload = this.getCategoryPayload();
    payload['category_id'] = this.selected_category.category_id,

    this.store.dispatch(new DeleteCategoryFromList(payload));
  }
/**
 * Get category id method
 * @param {number} index Current category index
 */
  private getCategoryId(index: number): number {
    return this.categories[index].category_id;
  }
/**
 * Sort categories by property method
 * @param {any[]} array Array to sort
 * @param {string} array Sort property
 */
  private sortByProperty(array: any[], propertyName: string): any {
    return array.sort(function (a, b) {
        return a[propertyName] - b[propertyName];
    });
  }
/**
 * Sort categories by property method
 * @param {number} page_no Current page number
 * @return {boolean}
 */
  private getItemsByPage(page_no: number): boolean {
    if (page_no === 0 || page_no === Math.ceil(this.total_count / this.items_per_page) + 1) {
      return false;
    }
    this.page_number = page_no;
    this.getItems();
  }
/**
 * Get categories array method
 */
  private getItems(): void {
    this.store.dispatch(new FetchCategories(this.getCategoryPayload()));
  }
/**
 * Get categories array per page method
 * @returns {any[]}
 */
  private range(): any[] {
    return Array.from(Array(Math.ceil(this.total_count / this.items_per_page)).keys());
  }
/**
 * Get category http request data method
 * @returns {object}
 */
  private getCategoryPayload(): object {
    return {
      filter_param: { 'id': this.case_id },
      sort_param: { field: 'order_position' },
      page_number: this.page_number,
      items_per_page: this.items_per_page
    };
  }
/**
 * Destroy edit-categories component life cycle method
 */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
