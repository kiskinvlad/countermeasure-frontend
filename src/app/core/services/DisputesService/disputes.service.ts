import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHelperService } from '@app/core/http-helper.service';
import { ApiRoutingService } from '@app/core/api-routing.service';

@Injectable()
export class DisputesService {

  private get_disputes_api_url: string;
  private get_disputed_api_url: string;

  constructor(
    private http: HttpHelperService,
    private apiRoutingService: ApiRoutingService
  ) {
    this.get_disputed_api_url = apiRoutingService.getDisputedApiUrl();
    this.get_disputes_api_url = apiRoutingService.getDisputesApiUrl();
  }

  getDisputes(): Observable<any> {
    return this.http.get(
      this.get_disputes_api_url,
      null,
      true,
      null
    );
  }

  getDisputed(payload): Observable<any> {
    return this.http.get(
      this.get_disputed_api_url,
      payload,
      true,
      null
    );
  }
}
