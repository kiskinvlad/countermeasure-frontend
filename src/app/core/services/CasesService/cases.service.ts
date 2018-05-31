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
  ) { }

  getFilteredAndSorted(payload): Observable<any> {
    return this.http.post(
      this.apiRoutingService.getFilteredAndSortedCasesAPIUrl(),
      payload,
      false,
      true,
      null
    );
  }

  getCreatedCase(payload): Observable<any> {
    return this.http.post(
      this.apiRoutingService.getCreateCaseAPIUrl(),
      payload,
      false,
      true,
      null
    );
  }

  getDeletedCase(payload): Observable<any> {
    return this.http.post(
      this.apiRoutingService.getDeleteCaseAPIUrl(),
      payload,
      false,
      true,
      null
    );
  }

  getCase(payload): Observable<any> {
    console.log(payload);
    return this.http.get(
      this.apiRoutingService.getCaseAPIUrl(),
      payload,
      true,
      null
    );
  }

  updateCase(payload): Observable<any> {
    return this.http.put(
      this.apiRoutingService.getUpdateCaseAPIUrl(),
      payload,
      false,
      true,
      null
    );
  }
}
