import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../../../shared/models/role';

import { HttpHelperService } from '../../http-helper.service';
import { ApiRoutingService } from '../../api-routing.service';

@Injectable()
export class CasesService {

  private role_api_url: string;

  constructor(
    private http: HttpHelperService,
    private apiRoutingService: ApiRoutingService
  ) {
    this.role_api_url = apiRoutingService.getFilteredAndSortedCasesAPIUrl();
   }

  getFilteredAndSorted(payload): Observable<any> {
    return this.http.post(
      this.apiRoutingService.getFilteredAndSortedCasesAPIUrl(),
      payload,
      false,
      true,
      null
    );
  }
}
