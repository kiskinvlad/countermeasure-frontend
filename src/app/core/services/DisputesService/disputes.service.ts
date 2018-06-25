import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHelperService } from '@app/core/http-helper.service';
import { ApiRoutingService } from '@app/core/api-routing.service';

@Injectable()
/**
 * Disputes Service for taxes CRUD operations
 */
export class DisputesService {
/**
 * @constructor
 * @param {HttpHelperService} http Http service
 * @param {ApiRoutingService} apiRoutingService Api routing service
 */
  constructor(
    private http: HttpHelperService,
    private apiRoutingService: ApiRoutingService
  ) { }
/**
 * Get taxes method
 * @returns {Observable<any>}
 */
  getDisputes(): Observable<any> {
    return this.http.get(
      this.apiRoutingService.getDisputesApiUrl(),
      null,
      true,
      null
    );
  }
/**
 * Get taxes by case method
 * @param {any} payload Http request data
 * @returns {Observable<any>}
 */
  getDisputesByCase(payload: any): Observable<any> {
    return this.http.get(
      this.apiRoutingService.getDisputesByCaseAPIUrl(),
      payload,
      true,
      null
    );
  }
/**
 * Get taxes by summary method
 * @param {any} payload Http request data
 * @returns {Observable<any>}
 */
  getDisputesBySummary(payload: any): Observable<any> {
    return this.http.get(
      this.apiRoutingService.getDisputesBySummaryAPIUrl(),
      payload,
      true,
      null
    );
  }
/**
 * Get tax method
 * @param {any} payload Http request data
 * @returns {Observable<any>}
 */
  getDisputed(payload: any): Observable<any> {
    return this.http.get(
      this.apiRoutingService.getDisputedApiUrl(),
      payload,
      true,
      null
    );
  }
/**
 * Create tax method
 * @param {any} payload Http request data
 * @returns {Observable<any>}
 */
  createDisputed(payload: any): Observable<any> {
    return this.http.post(
      this.apiRoutingService.getCreateDisputedAPIUrl(),
      payload,
      false,
      true,
      null
    );
  }
/**
 * Update tax method
 * @param {any} payload Http request data
 * @returns {Observable<any>}
 */
  updateDisputed(payload: any): Observable<any> {
    return this.http.post(
      this.apiRoutingService.getUpdateDisputedAPIUrl(),
      payload,
      false,
      true,
      null
    );
  }

/**
 * Remove tax method
 * @param {any} payload Http request data
 * @returns {Observable<any>}
 */
  removeDisputed(payload: any): Observable<any> {
    return this.http.post(
      this.apiRoutingService.getRemoveDisputedAPIUrl(),
      payload,
      false,
      true,
      null
    );
  }
/**
 * Get states infor method
 * @returns {Observable<any>}
 */
  getStates(): Observable<any> {
    return this.http.get(
      this.apiRoutingService.getStatesAPIUrl(),
      null,
      true,
      null
    );
  }
}
