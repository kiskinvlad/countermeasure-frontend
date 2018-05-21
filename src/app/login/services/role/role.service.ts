import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '@app/login/models/role';
import { Constants } from '@app/configs/constants';

@Injectable()
export class RoleService {

  private roles_api_url: String;
  private params: HttpParams;

  constructor(private http: HttpClient, private _constants: Constants) {
    this.roles_api_url = _constants.ROLES_API_ENDPOINT;
  }

  getRole(role_id: string): Observable<any> {
    const url = `${this.roles_api_url}`;
    this.params = new HttpParams().set('role_id', role_id);
    return this.http.get(url, {params: this.params});
  }
}
