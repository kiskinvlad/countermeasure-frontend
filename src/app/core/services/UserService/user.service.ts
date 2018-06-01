import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@app/shared/models/user';

import { ApiRoutingService } from '@app/core/api-routing.service';
import { HttpHelperService } from '@app/core/http-helper.service';

@Injectable()
export class UserService {

  private users_api_url: string;
  private password_api_url: string;

  constructor(
    private http: HttpHelperService,
    private apiRoutingService: ApiRoutingService
  ) {
    this.users_api_url = apiRoutingService.getUsersAPIUrl();
    this.password_api_url = apiRoutingService.getUpdatePasswordAPIUrl();
  }

  getUser(payload): Observable<any> {
    return this.http.get(
      this.users_api_url,
      payload,
      true,
      null
    );
  }

  updateUser(payload): Observable<any> {
    return this.http.put(
      this.users_api_url,
      payload,
      false,
      true,
      null
    );
  }

  updatePassword(payload): Observable<any> {
    return this.http.patch(
      this.password_api_url,
      payload,
      false,
      true
    );
  }
}
