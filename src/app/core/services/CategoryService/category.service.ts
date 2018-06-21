import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHelperService } from '@app/core/http-helper.service';
import { ApiRoutingService } from '@app/core/api-routing.service';

@Injectable()
/**
 * Category Service for categories CRUD operations
 */
export class CategoryService {
/**
 * @param {string} categories_api_url Get categories api url
 * @param {string} move_categories_api_url Move categories api url
 * @param {string} delete_category_from_list_api_url Delete category api url
 * @param {string} get_category_api_url Get category api url
 * @param {string} create_category_api_url Create category api url
 * @param {string} get_summary_create_csv_url Get summary create comma separated values table url
 */
  private categories_api_url: string;
  private move_categories_api_url: string;
  private delete_category_from_list_api_url: string;
  private get_category_api_url: string;
  private create_category_api_url: string;
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
    this.categories_api_url = apiRoutingService.getFilteredAndSortedCategoriesAPIUrl();
    this.move_categories_api_url = apiRoutingService.getMoveCategoryAPIUrl();
    this.delete_category_from_list_api_url = apiRoutingService.getDeleteCategoryFromListAPIUrl();
    this.get_category_api_url = apiRoutingService.getCategoryAPIUrl();
    this.get_summary_create_csv_url = apiRoutingService.getSummaryCreateCsvURL();
  }
/**
 * Get filtered and sorted categories method
 * @param {any} payload Http request data
 * @returns {Observable<any>}
 */
  getFilteredAndSorted(payload: any): Observable<any> {
    return this.http.post(
      this.categories_api_url,
      payload,
      false,
      true,
      null
    );
  }
/**
 * Move category in list method
 * @param {any} payload Http request data
 * @returns {Observable<any>}
 */
  moveCategory(payload: any): Observable<any> {
    return this.http.post(
      this.move_categories_api_url,
      payload,
      false,
      true,
      null
    );
  }
/**
 * Delete category from list method
 * @param {any} payload Http request data
 * @returns {Observable<any>}
 */
  deleteCategoryFromList(payload: any): Observable<any> {
    return this.http.post(
      this.delete_category_from_list_api_url,
      payload,
      false,
      true,
      null
    );
  }
/**
 * Update category method
 * @param {any} payload Http request data
 * @returns {Observable<any>}
 */
  updateCategory(payload: any): Observable<any> {
    return this.http.put(
      this.get_category_api_url,
      payload,
      false,
      true,
      null
    );
  }
/**
 * Get category data method
 * @param {any} payload Http request data
 * @returns {Observable<any>}
 */
  getCategory(payload: any): Observable<any> {
    return this.http.get(
      this.get_category_api_url,
      payload,
      true,
      null
    );
  }
/**
 * Create new category method
 * @param {any} payload Http request data
 * @returns {Observable<any>}
 */
  createCategory(payload: any): Observable<any> {
    return this.http.post(
      this.get_category_api_url,
      payload,
      false,
      true,
      null
    );
  }
/**
 * Delete category method
 * @param {any} payload Http request data
 * @returns {Observable<any>}
 */
  deleteCategory(payload: any): Observable<any> {
    return this.http.delete(
      this.get_category_api_url,
      payload,
      true,
      null
    );
  }
}
