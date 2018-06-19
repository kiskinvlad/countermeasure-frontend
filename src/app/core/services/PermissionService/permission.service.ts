import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiRoutingService } from '@app/core/api-routing.service';
import { HttpHelperService } from '@app/core/http-helper.service';

@Injectable()
/**
 * Permission Service for manipulate users permission
 */
export class PermissionService {
/**
 * @param {string} users_api_url
 * @param {string} org_api_url
 */
  private users_api_url: string;
  private org_api_url: string;
/**
 * @constructor
 * @param {HttpHelperService} http
 * @param {ApiRoutingService} apiRoutingService
 */
  constructor(
    private http: HttpHelperService,
    private apiRoutingService: ApiRoutingService
  ) {
    this.users_api_url = apiRoutingService.getUsersAPIUrl();
    this.org_api_url = apiRoutingService.getOrganizationAPIUrl();
  }
/**
 * Get guest permissions method
 * @param {any} payload
 * @returns {Observable<any>}
 */
  getGuestPermissions(payload: any): Observable<any> {
    return this.http.get(
      this.org_api_url + '/' + payload.org_id + '/permissions',
      payload,
      true,
      null
    );
  }
/**
 * Add guest permissions method
 * @param {any} payload
 * @returns {Observable<any>}
 */
  addGuestPermissions(payload: any): Observable<any> {
    return this.http.post(
      this.users_api_url + '/' + payload.user_id + '/permissions',
      payload,
      false,
      true
    );
  }
/**
 * Delete guest permissions method
 * @param {any} payload
 * @returns {Observable<any>}
 */
  deleteGuestPermissions(payload: any): Observable<any> {
    return this.http.delete(
      this.users_api_url + '/' + payload.user_id + '/permissions',
      payload,
      true
    );
  }
}
