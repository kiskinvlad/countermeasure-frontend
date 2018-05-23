import { Injectable } from '@angular/core';
import { ApiRoutingService } from '@app/core/api-routing.service';
import { HttpHelperService } from '@app/core/http-helper.service';
@Injectable()
export class AuthenticationService {

  private user_api_url: string;

  constructor(
    private http: HttpHelperService,
    private apiRoutingService: ApiRoutingService
  ) {
    this.user_api_url = apiRoutingService.getLoginAPIUrl();
  }

  logIn(email: string, password: string) {
    return this.http.post(this.user_api_url, {email, password}, false, null);
  }

}
