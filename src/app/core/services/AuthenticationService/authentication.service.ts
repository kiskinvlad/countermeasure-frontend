import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/';

import { HttpHelperService } from '../../http-helper.service';
import { ApiRoutingService } from '../../api-routing.service';
import { LocalStorageService } from '../LocalStorageService/local-storage.service';

import { User } from '../../../shared/models/user';
import { Auth } from '../../../shared/models/auth';


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

  register(user: Auth) {
    return this.http.post(
      this.apiRoutingService.getSignUpnAPIUrl(),
      user,
      false,
      null
    );
  }

  login(user: Auth) {
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
