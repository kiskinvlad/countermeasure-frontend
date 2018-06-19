import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectScenarioState } from '@app/shared/ngrx-store/app.states';
import { ActivatedRoute } from '@angular/router';
import { FetchSceneries, DeleteScenarioFromList, MoveScenario } from '@app/shared/ngrx-store/actions/scenario.actions';

@Component({
  selector: 'ct-edit-scenarios',
  templateUrl: './edit-scenarios.component.html',
  styleUrls: ['./edit-scenarios.component.scss']
})
/**
 * Edit scenarios component
 * @implements {OnInit, OnDestroy}
 */
export class EditScenariosComponent implements OnInit, OnDestroy {
/**
 * @param {Observable<any>} getState$ State observable param
 * @param {string | null} errorMessage Error message param
 * @param {Subscription} subscription Subscription param
 * @param {any} next_scenario Next scenario in list param
 * @param {any} selected_scenario Selected scenario in list param
 * @param {Array<any>} scenaries Scenaries array param
 * @param {number} case_id Current case id param
 * @param {number} total_count Scenaries count param
 * @param {number} items_per_page Scenaries count per page param
 * @param {number} page_number Current page number param
 * @param {number} total_page Pages count param
 */
  private getState$: Observable<any>;
  private errorMessage: string | null;
  private subscription: Subscription;
  private next_scenario: any;
  private selected_scenario: any;
  public sceneries: Array<any> = [];
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
    this.getState$ = this.store.select(selectScenarioState);
  }
/**
 * Initialize edit scenarios component life cycle method
 */
  ngOnInit() {
    this.subscription = this.getState$.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      this.total_count = state.totalCount;
      this.items_per_page = state.items_per_page;
      this.page_number = state.page_number;
      this.total_page = Math.ceil(state.totalCount / state.items_per_page);
      this.sceneries = (state.sceneries || []).map(item => {
        return {...item };
      });
      this.sceneries = this.sortByProperty(this.sceneries, 'order_position');
    });
    this.subscription = this.route.params.subscribe(params => {
      this.case_id = +params['case_id'];
    });

    const payload = this.getScenarioPayload();
    this.store.dispatch(new FetchSceneries(payload));
  }
/**
 * Move up scenario method
 * @param {number} index Current scenario index
 */
  private moveUp(index: number): void {
    this.selected_scenario = this.sceneries[index];
    this.next_scenario = this.sceneries[index - 1];
    if (this.next_scenario) {
      const payload = this.getScenarioPayload();
      payload['first_scenario'] = { id: this.selected_scenario.scenario_id, order_position: this.selected_scenario.order_position },
      payload['second_scenario'] = { id: this.next_scenario.scenario_id, order_position: this.next_scenario.order_position },
      this.store.dispatch(new MoveScenario(payload));
    }
  }
/**
 * Move down scenario method
 * @param {number} index Current scenario index
 */
  private moveDown(index: number): void {
    this.selected_scenario = this.sceneries[index];
    this.next_scenario = this.sceneries[index + 1];
    if (this.next_scenario) {
      const payload = this.getScenarioPayload();
      payload['first_scenario'] = { id: this.selected_scenario.scenario_id, order_position: this.selected_scenario.order_position },
      payload['second_scenario'] = { id: this.next_scenario.scenario_id, order_position: this.next_scenario.order_position },
      this.store.dispatch(new MoveScenario(payload));
    }
  }
/**
 * Delete scenario method
 * @param {number} index Current scenario index
 */
  private deleteScenario(index: number): void {
    this.selected_scenario = this.sceneries[index];
    const payload = this.getScenarioPayload();
    payload['scenario_id'] = this.selected_scenario.scenario_id,

    this.store.dispatch(new DeleteScenarioFromList(payload));
  }
/**
 * Get scenario id method
 * @param {number} index Current scenario index
 */
  private getScenarioId(index: number): number {
    return this.sceneries[index].scenario_id;
  }
/**
 * Sort scenaries by property method
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
    this.store.dispatch(new FetchSceneries(this.getScenarioPayload()));
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
  private getScenarioPayload(): object {
    return {
      filter_param: { 'id': this.case_id },
      sort_param: {field: 'order_position'},
      page_number: this.page_number,
      items_per_page: this.items_per_page
    };
  }
/**
 * Destroy edit-scenarios component life cycle method
 */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
