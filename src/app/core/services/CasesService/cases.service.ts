import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../../../shared/models/role';

import { HttpHelperService } from '../../http-helper.service';
import { ApiRoutingService } from '../../api-routing.service';

@Injectable()
/**
 * Case Service for cases CRUD operations
 */
export class CasesService {
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
 * Get filtered and sorted cases method
 * @param {any} payload Http request data
 * @returns {Observable<any>}
 */
  getFilteredAndSorted(payload: any): Observable<any> {
    return this.http.post(
      this.apiRoutingService.getFilteredAndSortedCasesAPIUrl(),
      payload,
      false,
      true,
      null
    );
  }
/**
 * Create new case method
 * @param {any} payload Http request data
 * @returns {Observable<any>}
 */
  getCreatedCase(payload: any): Observable<any> {
    return this.http.post(
      this.apiRoutingService.getCreateCaseAPIUrl(),
      payload,
      false,
      true,
      null
    );
  }
/**
 * Delete case method
 * @param {any} payload Http request data
 * @returns {Observable<any>}
 */
  getDeletedCase(payload): Observable<any> {
    return this.http.post(
      this.apiRoutingService.getDeleteCaseAPIUrl(),
      payload,
      false,
      true,
      null
    );
  }
/**
 * Get case method
 * @param {any} payload Http request data
 * @returns {Observable<any>}
 */
  getCase(payload: any): Observable<any> {
    console.log(payload);
    return this.http.get(
      this.apiRoutingService.getCaseAPIUrl(),
      payload,
      true,
      null
    );
  }
/**
 * Update case method
 * @param {any} payload Http request data
 * @returns {Observable<any>}
 */
  updateCase(payload: any): Observable<any> {
    return this.http.put(
      this.apiRoutingService.getUpdateCaseAPIUrl(),
      payload,
      false,
      true,
      null
    );
  }
}
