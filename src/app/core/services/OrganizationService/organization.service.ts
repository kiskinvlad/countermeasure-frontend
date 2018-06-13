import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organization } from '@app/shared/models/organization';

import { ApiRoutingService } from '@app/core/api-routing.service';
import { HttpHelperService } from '@app/core/http-helper.service';

@Injectable()
export class OrganizationService {

  private organization_api_url: string;
  private org_stats_api_url: string;

  constructor(
    private http: HttpHelperService,
    private apiRoutingService: ApiRoutingService
  ) {
    this.organization_api_url = apiRoutingService.getOrganizationAPIUrl();
    this.org_stats_api_url = apiRoutingService.getOrganizationStatsAPIUrl();
  }

  getOrganization(payload): Observable<any> {
    return this.http.get(
      this.organization_api_url + '/' + payload.org_id,
      null,
      true,
      null
    );
  }

  updateOrganization(payload): Observable<any> {
    return this.http.put(
      this.organization_api_url + '/' + payload.org_id,
      payload,
      false,
      true,
      null
    );
  }

  getOrganizations(payload): Observable<any> {
    return this.http.get(
      this.org_stats_api_url,
      payload,
      true
    );
  }

  createOrganization(payload): Observable<any> {
    return this.http.post(
      this.organization_api_url,
      payload,
      false,
      true
    );
  }
}
