import { Injectable } from '@angular/core';
import { HttpHelperService } from '@app/core/http-helper.service';
import { ApiRoutingService } from '@app/core/api-routing.service';
import { Observable } from 'rxjs';

@Injectable()
export class ScenarioService {

  private scenaries_api_url: string;
  private move_scenaries_api_url: string;
  private delete_scenario_from_list_api_url: string;
  private get_scenario_api_url: string;

constructor(
    private http: HttpHelperService,
    private apiRoutingService: ApiRoutingService
  ) {
    this.scenaries_api_url = apiRoutingService.getFilteredAndSortedSceneriesAPIUrl();
    this.move_scenaries_api_url = apiRoutingService.getMoveScenarioAPIUrl();
    this.delete_scenario_from_list_api_url = apiRoutingService.getDeleteScenarioFromListAPIUrl();
    this.get_scenario_api_url = apiRoutingService.getScenarioAPIUrl();
  }

  getFilteredAndSorted(payload): Observable<any> {
    return this.http.post(
      this.scenaries_api_url,
      payload,
      false,
      true,
      null
    );
  }

  moveScenario(payload): Observable<any> {
    return this.http.post(
      this.move_scenaries_api_url,
      payload,
      false,
      true,
      null
    );
  }

  deleteScenarioFromList(payload): Observable<any> {
    return this.http.post(
      this.delete_scenario_from_list_api_url,
      payload,
      false,
      true,
      null
    );
  }

  updateScenario(payload): Observable<any> {
    return this.http.put(
      this.get_scenario_api_url,
      payload,
      false,
      true,
      null
    );
  }

  getScenario(payload): Observable<any> {
    return this.http.get(
      this.get_scenario_api_url,
      payload,
      true,
      null
    );
  }

  createScenario(payload): Observable<any> {
    return this.http.post(
      this.get_scenario_api_url,
      payload,
      false,
      true,
      null
    );
  }

  deleteScenario(payload): Observable<any> {
    return this.http.delete(
      this.get_scenario_api_url,
      payload,
      true,
      null
    );
  }
}
