import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable()
export class ApiRoutingService {
  private baseUrl = environment.BASE_API_URL;

  constructor() {}

  getSignUpnAPIUrl(): string {
    return this.baseUrl + 'users/register';
  }

  getLoginAPIUrl(): string {
    return this.baseUrl + 'users/login';
  }

  getRoleAPIUrl(): string {
    return this.baseUrl + 'roles';
  }

  getFilteredAndSortedCasesAPIUrl(): string {
    return this.baseUrl + 'cases';
  }
  
  getUsersAPIUrl(): string {
    return this.baseUrl + 'users';
  }
}
