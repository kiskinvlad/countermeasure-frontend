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

  getUsersAPIUrl(): string {
    return this.baseUrl + 'users';
  }

  getDeleteCaseAPIUrl(): string {
    return this.baseUrl + 'cases/delete';
  }

  getFilteredAndSortedCategoriesAPIUrl(): string {
    return this.baseUrl + 'category/all';
  }

  getMoveCategoryAPIUrl(): string {
    return this.baseUrl + 'category/move';
  }

  getDeleteCategoryFromListAPIUrl(): string {
    return this.baseUrl + 'category/delete';
  }

  getCategoryAPIUrl(): string {
    return this.baseUrl + 'category';
  }

  getDisputedApiUrl(): string {
    return this.baseUrl + 'disputes';
  }

  getDisputesApiUrl(): string {
    return this.baseUrl + 'disputes/all';
  }

  getCaseAPIUrl(): string {
    return this.baseUrl + 'cases';
  }

  getUpdateCaseAPIUrl(): string {
    return this.baseUrl + 'cases';
  }

  getSummaryCreateCsvURL(): string {
    return this.baseUrl + 'category/csv';
  }
}
