import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '@app/login/models/role';

@Injectable()
export class RoleService {

  private BASE_URL = 'http://localhost:3000';
  private params: HttpParams;

  constructor(private http: HttpClient) {}

  getRole(role_id: string): Observable<any> {
    const url = `${this.BASE_URL}/roles`;
    this.params = new HttpParams().set('role_id', role_id);
    return this.http.get(url, {params: this.params});
  }
}
