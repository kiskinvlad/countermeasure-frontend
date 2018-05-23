import { Injectable } from '@angular/core';
import { ApiRoutingService } from '@app/core/api-routing.service';
import { HttpHelperService } from '@app/core/http-helper.service';
import { Auth } from '@app/shared/models/auth';

@Injectable()
export class AuthenticationService {

  private user_api_url: string;

  constructor(
    private http: HttpHelperService,
    private apiRoutingService: ApiRoutingService
  ) {
    this.user_api_url = apiRoutingService.getLoginAPIUrl();
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

}
