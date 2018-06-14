import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiRoutingService } from '@app/core/api-routing.service';
import { HttpHelperService } from '@app/core/http-helper.service';

@Injectable()
export class PermissionService {

  private users_api_url: string;
  private org_api_url: string;

  constructor(
    private http: HttpHelperService,
    private apiRoutingService: ApiRoutingService
  ) {
    this.users_api_url = apiRoutingService.getUsersAPIUrl();
    this.org_api_url = apiRoutingService.getOrganizationAPIUrl();
  }

  getGuestPermissions(payload): Observable<any> {
    return this.http.get(
      this.org_api_url + '/' + payload.org_id + '/permissions',
      payload,
      true,
      null
    );
  }

  addGuestPermissions(payload): Observable<any> {
    return this.http.post(
      this.users_api_url + '/' + payload.user_id + '/permissions',
      payload,
      false,
      true
    );
  }

  deleteGuestPermissions(payload): Observable<any> {
    return this.http.delete(
      this.users_api_url + '/' + payload.user_id + '/permissions',
      payload,
      true
    );
  }
}
