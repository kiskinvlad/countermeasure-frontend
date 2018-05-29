import { Injectable } from '@angular/core';
import { ApiRoutingService } from '@app/core/api-routing.service';
import { HttpHelperService } from '@app/core/http-helper.service';
import { Auth } from '@app/shared/models/auth';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthenticationService {

  private user_api_url: string;
  private decoded_token: any;
  private jwts: JwtHelperService;

  constructor(
    private http: HttpHelperService,
    private apiRoutingService: ApiRoutingService
  ) {
    this.user_api_url = apiRoutingService.getLoginAPIUrl();
    this.jwts = new JwtHelperService();
  }
  register(user: Auth) {
    return this.http.post(
      this.apiRoutingService.getSignUpnAPIUrl(),
      user,
      false,
      null
    );
  }

  logIn(user: Auth) {
    return this.http.post(this.user_api_url, user, false, null);
  }

  private getTokenExpirationDate(token: string): Date {
    const decoded_token = this.jwts.decodeToken(token);
    const date = new Date(0);
    if (decoded_token.exp === undefined)  { return null; }
    date.setUTCSeconds(decoded_token.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) { return true; }
    const exp_date = this.getTokenExpirationDate(token);
    if (exp_date === undefined) { return false; }
    return !(exp_date.valueOf() > new Date().valueOf());
  }

}
