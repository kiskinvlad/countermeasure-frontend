import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@app/shared/models/user';

import { ApiRoutingService } from '@app/core/api-routing.service';
import { HttpHelperService } from '@app/core/http-helper.service';
/**
 * User Service for users CRUD operations
 */
@Injectable()
/**
 * User Service for users CRUD operations
 */
export class UserService {
/**
 * @param {string} users_api_url
 * @param {string} password_api_url
 * @param {string} all_users_api_url
 */
  private users_api_url: string;
  private password_api_url: string;
  private all_users_api_url: string;
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
    this.password_api_url = apiRoutingService.getUpdatePasswordAPIUrl();
  }
/**
 * Get user method
 * @param {string} role_id
 * @returns {Observable<any>}
 */
  getUser(payload: any): Observable<any> {
    return this.http.get(
      this.users_api_url + '/' + payload.user_id,
      payload,
      true,
      null
    );
  }
/**
 * Update user method
 * @param {string} role_id
 * @returns {Observable<any>}
 */
  updateUser(payload: any): Observable<any> {
    const url = (payload && payload.user_id) ? (this.users_api_url + '/' + payload.user_id) : this.users_api_url;
    return this.http.put(
      url,
      payload,
      false,
      true,
      null
    );
  }
/**
 * Update user password method
 * @param {string} role_id
 * @returns {Observable<any>}
 */
  updatePassword(payload: any): Observable<any> {
    return this.http.patch(
      this.password_api_url,
      payload,
      false,
      true
    );
  }
/**
 * Get users method
 * @param {string} role_id
 * @returns {Observable<any>}
 */
  getUsers(payload: any): Observable<any> {
    return this.http.get(
      this.users_api_url,
      payload,
      true
    );
  }
/**
 * Create user method
 * @param {string} role_id
 * @returns {Observable<any>}
 */
  createUser(payload: any): Observable<any> {
    return this.http.post(
      this.users_api_url,
      payload,
      false,
      true
    );
  }

}
