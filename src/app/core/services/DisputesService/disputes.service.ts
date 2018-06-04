import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHelperService } from '@app/core/http-helper.service';
import { ApiRoutingService } from '@app/core/api-routing.service';

@Injectable()
export class DisputesService {

  constructor(
    private http: HttpHelperService,
    private apiRoutingService: ApiRoutingService
  ) { }

  getDisputes(): Observable<any> {
    return this.http.get(
      this.apiRoutingService.getDisputesApiUrl(),
      null,
      true,
      null
    );
  }

  getDisputesByCase(payload): Observable<any> {
    return this.http.get(
      this.apiRoutingService.getDisputesByCaseAPIUrl(),
      payload,
      true,
      null
    );
  }

  getDisputed(payload): Observable<any> {
    return this.http.get(
      this.apiRoutingService.getDisputedApiUrl(),
      payload,
      true,
      null
    );
  }

  createDisputed(payload): Observable<any> {
    return this.http.post(
      this.apiRoutingService.getCreateDisputedAPIUrl(),
      payload,
      false,
      true,
      null
    );
  }

  updateDisputed(payload): Observable<any> {
    return this.http.post(
      this.apiRoutingService.getUpdateDisputedAPIUrl(),
      payload,
      false,
      true,
      null
    );
  }

  removeDisputed(payload): Observable<any> {
    return this.http.post(
      this.apiRoutingService.getRemoveDisputedAPIUrl(),
      payload,
      false,
      true,
      null
    );
  }
}
