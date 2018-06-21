import { Injectable } from '@angular/core';
import { HttpHelperService } from '@app/core/http-helper.service';
import { ApiRoutingService } from '@app/core/api-routing.service';
import { Observable } from 'rxjs';

@Injectable()
/**
 * Csv Service for generate comma separeted value table
 */
export class CsvService {
/**
 * @param {string} get_summary_create_csv_url
 */
  private get_summary_create_csv_url: string;
/**
 * @constructor
 * @param {HttpHelperService} http Http service
 * @param {ApiRoutingService} apiRoutingService Api routing service
 */
  constructor(
    private http: HttpHelperService,
    private apiRoutingService: ApiRoutingService
  ) {
    this.get_summary_create_csv_url = apiRoutingService.getSummaryCreateCsvURL();
  }
/**
 * Create comma separated values table method
 * @param {any} payload Http request data
 * @returns {Observable<any>}
 */
  createCsv(payload: any): Observable<any> {
    return this.http.post(
      this.get_summary_create_csv_url,
      payload,
      false,
      true,
      null
    );
  }
}
