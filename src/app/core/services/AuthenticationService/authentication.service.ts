import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/';

import { HttpHelperService } from '../../http-helper.service';
import { ApiRoutingService } from '../../api-routing.service';
import { LocalStorageService } from '../LocalStorageService/local-storage.service';

import { UserDetails } from '../../../shared/interfaces/user-details';
import { TokenResponse } from '../../../shared/interfaces/token-response';
import { TokenPayload} from '../../../shared/interfaces/token-payload';


@Injectable()
export class AuthenticationService {

  constructor(    
    private router: Router,
    private http: HttpHelperService,
    private apiRoutingService: ApiRoutingService,
    private localStorage: LocalStorageService
  ) { }

  public isLoggedIn(): boolean {
    return !!this.localStorage.getAuthToken();
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
    this.localStorage.removeAuthToken();
    this.router.navigate(['login']);
  }

}
