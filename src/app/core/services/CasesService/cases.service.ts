import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../../../shared/models/role';

import { HttpHelperService } from '../../http-helper.service';
import { ApiRoutingService } from '../../api-routing.service';

@Injectable()
export class CasesService {

  constructor(
    private http: HttpHelperService,
    private apiRoutingService: ApiRoutingService
  ) {  }

  getFilteredAndSorted(filter_param, sort_param): Observable<any> {
    return this.http.post(
      this.apiRoutingService.getFilteredAndSortedCasesAPIUrl(),
      {filter_param, sort_param},
      false,
      null
    );
  }
}
