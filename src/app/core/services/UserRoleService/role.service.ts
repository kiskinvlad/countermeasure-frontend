import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../../../shared/models/role';

import { HttpHelperService } from '../../http-helper.service';
import { ApiRoutingService } from '../../api-routing.service';

@Injectable()
export class RoleService {

  constructor(
    private http: HttpHelperService,
    private apiRoutingService: ApiRoutingService
  ) {  }

  getRole(role_id: string): Observable<any> {
    return this.http.get(
      this.apiRoutingService.getRoleAPIUrl(),
      {role_id},
      false,
      null
    );
  }
}
