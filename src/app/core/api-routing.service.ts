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
    return this.baseUrl + 'cases/filter';
  }

  getCreateCaseAPIUrl(): string {
    return this.baseUrl + 'cases';
  }

  getFilteredAndSortedCategoriesAPIUrl(): string {
    return this.baseUrl + 'category/all';
  }

  getMoveCategoryAPIUrl(): string {
    return this.baseUrl + 'category/move';
  }

  getDeleteCategoryAPIUrl(): string {
    return this.baseUrl + 'category/delete';
  }

  getCategoryAPIUrl(): string {
    return this.baseUrl + 'category';
  }

  getCreateCategoryAPIUrl(): string {
    return this.baseUrl + 'category/create';
  }

  getDisputedApiUrl(): string {
    return this.baseUrl + 'disputes';
  }

  getDisputesApiUrl(): string {
    return this.baseUrl + 'disputes/all';
  }
}
