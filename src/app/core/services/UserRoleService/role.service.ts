import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHelperService } from '@app/core/http-helper.service';
import { ApiRoutingService } from '@app/core/api-routing.service';

@Injectable()
/**
 * Role Service for get user role
 */
export class RoleService {
/**
 * @param {string} roles_api_url
 */
  private roles_api_url: string;
/**
 * @constructor
 * @param {HttpHelperService} http
 * @param {ApiRoutingService} apiRoutingService
 */
  constructor(private http: HttpHelperService, private apiRouting: ApiRoutingService) {
    this.roles_api_url = apiRouting.getLoginAPIUrl();
  }
/**
 * Get user role method
 * @param {string} role_id
 * @returns {Observable<any>}
 */
  getRole(role_id: string): Observable<any> {
    return this.http.get(this.roles_api_url, {role_id}, false, null);
  }
}
