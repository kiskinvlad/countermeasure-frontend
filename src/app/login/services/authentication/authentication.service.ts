import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../models/user';


@Injectable()
export class AuthenticationService {

  private BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('token');
  }

  logIn(email: string, password: string): Observable<any> {
    const url = `${this.BASE_URL}/users/login`;
    return this.http.post<User>(url, {email, password});
  }

  // public logout(): void {
  //   this.token = '';
  //   window.localStorage.removeItem('mean-token');
  //   this.router.navigateByUrl('/login');
  // }

}
