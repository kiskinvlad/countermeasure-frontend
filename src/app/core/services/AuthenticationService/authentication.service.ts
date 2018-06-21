import { Injectable } from '@angular/core';
import { ApiRoutingService } from '@app/core/api-routing.service';
import { HttpHelperService } from '@app/core/http-helper.service';
import { Auth } from '@app/shared/models/auth';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
/**
 * Authentication Service allow to login, register users
 * and check user session
 *
 */
export class AuthenticationService {
/**
 * @param {string} user_api_url User api url
 * @param {any} decoded_token Decoded token object
 * @param {JwtHelperService} jwts Parse jwt service
 */
  private user_api_url: string;
  private decoded_token: any;
  private jwts: JwtHelperService;
/**
 * @constructor
 * @param {HttpHelperService} http Http service
 * @param {ApiRoutingService} apiRoutingService Routing service
 */
  constructor(
    private http: HttpHelperService,
    private apiRoutingService: ApiRoutingService
  ) {
    this.user_api_url = apiRoutingService.getLoginAPIUrl();
    this.jwts = new JwtHelperService();
  }
/**
 * Register method. Allow user to register
 * @param {Auth} user User object
 * @returns {Observable<any>}
 */
 register(user: Auth): Observable<any> {
    return this.http.post(
      this.apiRoutingService.getSignUpnAPIUrl(),
      user,
      false,
      null
    );
  }
/**
 * Lgoin method. Allow user to login, returns user data
 * @param {Auth} user User object
 * @returns {Observable<any>}
 */
  logIn(user: Auth): Observable<any> {
    return this.http.post(this.user_api_url, user, false, null);
  }
/**
 * Get token expiration date method. Return date when token will be expiered
 * @param {string} token Token string
 */
  private getTokenExpirationDate(token: string): Date {
    const decoded_token = this.jwts.decodeToken(token);
    const date = new Date(0);
    if (decoded_token.exp === undefined)  { return null; }
    date.setUTCSeconds(decoded_token.exp);
    return date;
  }
/**
 * Is token expired method. Check if token already expired
 * @param {string} token Token string
 * @returns {boolean}
 */
  isTokenExpired(token?: string): boolean {
    if (!token) { return true; }
    const exp_date = this.getTokenExpirationDate(token);
    if (exp_date === undefined) { return false; }
    return !(exp_date.valueOf() > new Date().valueOf());
  }

}
