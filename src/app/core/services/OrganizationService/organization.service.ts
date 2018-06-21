import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organization } from '@app/shared/models/organization';

import { ApiRoutingService } from '@app/core/api-routing.service';
import { HttpHelperService } from '@app/core/http-helper.service';

@Injectable()
/**
 * Organization Service for organizations CRUD operations
 */
export class OrganizationService {
/**
 * @param {string} organization_api_url
 * @param {string} org_stats_api_url
 */
  private organization_api_url: string;
  private org_stats_api_url: string;
/**
 * @constructor
 * @param {HttpHelperService} http
 * @param {ApiRoutingService} apiRoutingService
 */
  constructor(
    private http: HttpHelperService,
    private apiRoutingService: ApiRoutingService
  ) {
    this.organization_api_url = apiRoutingService.getOrganizationAPIUrl();
    this.org_stats_api_url = apiRoutingService.getOrganizationStatsAPIUrl();
  }
/**
 * Get organization method
 * @param {any} payload
 * @returns {Observable<any>}
 */
  getOrganization(payload: any): Observable<any> {
    return this.http.get(
      this.organization_api_url + '/' + payload.org_id,
      null,
      true,
      null
    );
  }
/**
 * Update organization method
 * @param {any} payload
 * @returns {Observable<any>}
 */
  updateOrganization(payload: any): Observable<any> {
    return this.http.put(
      this.organization_api_url + '/' + payload.org_id,
      payload,
      false,
      true,
      null
    );
  }
/**
 * Get organizations method
 * @param {any} payload
 * @returns {Observable<any>}
 */
  getOrganizations(payload: any): Observable<any> {
    return this.http.get(
      this.org_stats_api_url,
      payload,
      true
    );
  }
/**
 * Create organization method
 * @param {any} payload
 * @returns {Observable<any>}
 */
  createOrganization(payload: any): Observable<any> {
    return this.http.post(
      this.organization_api_url,
      payload,
      false,
      true
    );
  }
}
