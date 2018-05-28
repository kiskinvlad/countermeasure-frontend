import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHelperService } from '@app/core/http-helper.service';
import { ApiRoutingService } from '@app/core/api-routing.service';

@Injectable()
export class CategoryService {

  private categories_api_url: string;
  private move_categories_api_url: string;
  private delete_category_api_url: string;

  constructor(
    private http: HttpHelperService,
    private apiRoutingService: ApiRoutingService
  ) {
    this.categories_api_url = apiRoutingService.getFilteredAndSortedCategoriesAPIUrl();
    this.move_categories_api_url = apiRoutingService.getMoveCategoryAPIUrl();
    this.delete_category_api_url = apiRoutingService.getDeleteCategoryAPIUrl();
  }

  getFilteredAndSorted(payload): Observable<any> {
    return this.http.post(
      this.categories_api_url,
      payload,
      false,
      true,
      null
    );
  }

  moveCategory(payload): Observable<any> {
    return this.http.post(
      this.move_categories_api_url,
      payload,
      false,
      true,
      null
    );
  }

  deleteCategory(payload): Observable<any> {
    return this.http.post(
      this.delete_category_api_url,
      payload,
      false,
      true,
      null
    );
  }
}
