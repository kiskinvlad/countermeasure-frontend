import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { Constants } from '@configs/constants';
import { State } from '../../store/reducers/auth.reducers';
import { Store } from '@ngrx/store';
import { Auth } from '@app/login/models/auth';
@Injectable()
export class AuthenticationService {

  private user_api_url: String;

  constructor(private http: HttpClient, private _constants: Constants) {
    this.user_api_url = _constants.USERS_API_ENDPOINT;
  }

  logIn(email: string, password: string): Observable<Auth> {
    const url = `${this.user_api_url}/login`;
    return this.http.post<Auth>(url, {email, password});
  }

}
