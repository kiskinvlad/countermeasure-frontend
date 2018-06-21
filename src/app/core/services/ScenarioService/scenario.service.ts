import { Injectable } from '@angular/core';
import { HttpHelperService } from '@app/core/http-helper.service';
import { ApiRoutingService } from '@app/core/api-routing.service';
import { Observable } from 'rxjs';

@Injectable()
/**
 * Scenario Service for scenaries CRUD operations
 */
export class ScenarioService {
/**
 * @param {string} scenaries_api_url
 * @param {string} move_scenaries_api_url
 * @param {string} delete_scenario_from_list_api_url
 * @param {string} get_scenario_api_url
 */
  private scenarios_api_url: string;
  private move_scenarios_api_url: string;
  private delete_scenario_from_list_api_url: string;
  private get_scenario_api_url: string;
/**
 * @constructor
 * @param {HttpHelperService} http
 * @param {ApiRoutingService} apiRoutingService
 */
constructor(
    private http: HttpHelperService,
    private apiRoutingService: ApiRoutingService
  ) {
    this.scenarios_api_url = apiRoutingService.getFilteredAndSortedScenariosAPIUrl();
    this.move_scenarios_api_url = apiRoutingService.getMoveScenarioAPIUrl();
    this.delete_scenario_from_list_api_url = apiRoutingService.getDeleteScenarioFromListAPIUrl();
    this.get_scenario_api_url = apiRoutingService.getScenarioAPIUrl();
  }
/**
 * Get filtered and sorted scenaries method
 * @param {any} payload
 * @returns {Observable<any>}
 */
  getFilteredAndSorted(payload: any): Observable<any> {
    return this.http.post(
      this.scenarios_api_url,
      payload,
      false,
      true,
      null
    );
  }
/**
 * Move scenario in list method
 * @param {any} payload
 * @returns {Observable<any>}
 */
  moveScenario(payload: any): Observable<any> {
    return this.http.post(
      this.move_scenarios_api_url,
      payload,
      false,
      true,
      null
    );
  }
/**
 * Delete scenario from list method
 * @param {any} payload
 * @returns {Observable<any>}
 */
  deleteScenarioFromList(payload: any): Observable<any> {
    return this.http.post(
      this.delete_scenario_from_list_api_url,
      payload,
      false,
      true,
      null
    );
  }
/**
 * Update scenario method
 * @param {any} payload
 * @returns {Observable<any>}
 */
  updateScenario(payload: void): Observable<any> {
    return this.http.put(
      this.get_scenario_api_url,
      payload,
      false,
      true,
      null
    );
  }
/**
 * Get scenario method
 * @param {any} payload
 * @returns {Observable<any>}
 */
  getScenario(payload: any): Observable<any> {
    return this.http.get(
      this.get_scenario_api_url,
      payload,
      true,
      null
    );
  }
/**
 * Create scenario method
 * @param {any} payload
 * @returns {Observable<any>}
 */
  createScenario(payload: any): Observable<any> {
    return this.http.post(
      this.get_scenario_api_url,
      payload,
      false,
      true,
      null
    );
  }
/**
 * Delete scenario method
 * @param {any} payload
 * @returns {Observable<any>}
 */
  deleteScenario(payload: any): Observable<any> {
    return this.http.delete(
      this.get_scenario_api_url,
      payload,
      true,
      null
    );
  }
}
