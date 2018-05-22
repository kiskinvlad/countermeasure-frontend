import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/';

import { HttpHelperService } from '../../http-helper.service';
import { ApiRoutingService } from '../../api-routing.service';

import { UserDetails } from '../../../shared/interfaces/user-details';
import { TokenResponse } from '../../../shared/interfaces/token-response';
import { TokenPayload} from '../../../shared/interfaces/token-payload';


@Injectable()
export class AuthenticationService {

  constructor(    
    private http: HttpHelperService,
    private apiRoutingService: ApiRoutingService,
  ) { }

  public isLoggedIn(): boolean {
    return !!this.http.authToken();
  }

  register(user: TokenPayload) {
    return this.http.post(
      this.apiRoutingService.getSignUpnAPIUrl(),
      user,
      false,
      null
    );
  }

  login(user: TokenPayload) {
    return this.http.post(
      this.apiRoutingService.getLoginAPIUrl(),
      user,
      false,
      null
    );
  }

  public logout(): void {
    return this.http.removeAuthToken();
  }

}
