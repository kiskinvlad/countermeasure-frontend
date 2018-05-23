import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHelperService } from '@app/core/http-helper.service';
import { ApiRoutingService } from '@app/core/api-routing.service';

@Injectable()
export class RoleService {

  private roles_api_url: string;

  constructor(private http: HttpHelperService, private apiRouting: ApiRoutingService) {
    this.roles_api_url = apiRouting.getLoginAPIUrl();
  }

  getRole(role_id: string) {
    return this.http.get(this.roles_api_url, {role_id}, false, null);
  }
}
