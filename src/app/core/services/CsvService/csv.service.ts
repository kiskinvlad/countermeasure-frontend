import { Injectable } from '@angular/core';
import { HttpHelperService } from '@app/core/http-helper.service';
import { ApiRoutingService } from '@app/core/api-routing.service';
import { Observable } from 'rxjs';

@Injectable()
export class CsvService {

  private get_summary_create_csv_url: string;

  constructor(
    private http: HttpHelperService,
    private apiRoutingService: ApiRoutingService
  ) {
    this.get_summary_create_csv_url = apiRoutingService.getSummaryCreateCsvURL();
  }

  createCsv(payload): Observable<any> {
    return this.http.post(
      this.get_summary_create_csv_url,
      payload,
      false,
      true,
      null
    );
  }
}
