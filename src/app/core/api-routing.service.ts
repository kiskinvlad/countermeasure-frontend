import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable()
/**
 * Api Routing Service for get api urls
 */
export class ApiRoutingService {
/**
 * @param {string} environment.BASE_API_URL
 */
  private baseUrl = environment.BASE_API_URL;

  constructor() {}
/**
 * Get sign up api url method
 * @returns {string}
 */
  getSignUpnAPIUrl(): string {
    return this.baseUrl + 'users/register';
  }
/**
 * Get login api url method
 * @returns {string}
 */
  getLoginAPIUrl(): string {
    return this.baseUrl + 'users/login';
  }
/**
 * Get role api url method
 * @returns {string}
 */
  getRoleAPIUrl(): string {
    return this.baseUrl + 'roles';
  }
/**
 * Get filtered and stored cases api url method
 * @returns {string}
 */
  getFilteredAndSortedCasesAPIUrl(): string {
    return this.baseUrl + 'cases/filter';
  }
/**
 * Get create case api url method
 * @returns {string}
 */
  getCreateCaseAPIUrl(): string {
    return this.baseUrl + 'cases';
  }
/**
 * Get users api url method
 * @returns {string}
 */
  getUsersAPIUrl(): string {
    return this.baseUrl + 'users';
  }
/**
 * Get update user api url method
 * @returns {string}
 */
  getUpdatePasswordAPIUrl(): string {
    return this.baseUrl + 'users/password';
  }
/**
 * Get delete case api url method
 * @returns {string}
 */
  getDeleteCaseAPIUrl(): string {
    return this.baseUrl + 'cases/delete';
  }
/**
 * Get filtered and stored categories api url method
 * @returns {string}
 */
  getFilteredAndSortedCategoriesAPIUrl(): string {
    return this.baseUrl + 'category/all';
  }
/**
 * Get move category api url method
 * @returns {string}
 */
  getMoveCategoryAPIUrl(): string {
    return this.baseUrl + 'category/move';
  }
/**
 * Get delete category api url method
 * @returns {string}
 */
  getDeleteCategoryFromListAPIUrl(): string {
    return this.baseUrl + 'category/delete';
  }
/**
 * Get category api url method
 * @returns {string}
 */
  getCategoryAPIUrl(): string {
    return this.baseUrl + 'category';
  }
/**
 * Get tax api url method
 * @returns {string}
 */
  getDisputedApiUrl(): string {
    return this.baseUrl + 'disputes';
  }
/**
 * Get create tax api url method
 * @returns {string}
 */
  getCreateDisputedAPIUrl(): string {
    return this.baseUrl + 'disputes/create';
  }
/**
 * Get update tax api url method
 * @returns {string}
 */
  getUpdateDisputedAPIUrl(): string {
    return this.baseUrl + 'disputes/update';
  }
/**
 * Get remove tax api url method
 * @returns {string}
 */
  getRemoveDisputedAPIUrl(): string {
    return this.baseUrl + 'disputes/remove';
  }
/**
 * Get taxex by case api url method
 * @returns {string}
 */
  getDisputesByCaseAPIUrl(): string {
    return this.baseUrl + 'disputes/case';
  }
/**
 * Get taxes by summary api url method
 * @returns {string}
 */
  getDisputesBySummaryAPIUrl(): string {
    return this.baseUrl + 'disputes/summary';
  }
/**
 * Get taxes api url method
 * @returns {string}
 */
  getDisputesApiUrl(): string {
    return this.baseUrl + 'disputes/all';
  }
/**
 * Get case api url method
 * @returns {string}
 */
  getCaseAPIUrl(): string {
    return this.baseUrl + 'cases';
  }
/**
 * Get update case api url method
 * @returns {string}
 */
  getUpdateCaseAPIUrl(): string {
    return this.baseUrl + 'cases';
  }
/**
 * Get filtered and stored scenaries api url method
 * @returns {string}
 */
  getFilteredAndSortedSceneriesAPIUrl(): string {
    return this.baseUrl + 'scenario/all';
  }
/**
 * Get move scenario api url method
 * @returns {string}
 */
  getMoveScenarioAPIUrl(): string {
    return this.baseUrl + 'scenario/move';
  }
/**
 * Get delete scenario from list api url method
 * @returns {string}
 */
  getDeleteScenarioFromListAPIUrl(): string {
    return this.baseUrl + 'scenario/delete';
  }
/**
 * Get scenario api url method
 * @returns {string}
 */
  getScenarioAPIUrl(): string {
    return this.baseUrl + 'scenario';
  }
/**
 * Get summary create cvs api url method
 * @returns {string}
 */
  getSummaryCreateCsvURL(): string {
    return this.baseUrl + 'csv';
  }
/**
 * Get organization api url method
 * @returns {string}
 */
  getOrganizationAPIUrl(): string {
    return this.baseUrl + 'organizations';
  }
/**
 * Get organization statistic api url method
 * @returns {string}
 */
  getOrganizationStatsAPIUrl(): string {
    return this.baseUrl + 'organizations/statistics';
  }
}
