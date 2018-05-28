import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, filter, scan, tap, concatMap } from 'rxjs/operators';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/observable/from';

import { NgxPermissionsService } from 'ngx-permissions';
import { CategoriesActionTypes } from '@app/shared/ngrx-store/constants/category';
import { CategoryService } from '@app/core/services/CategoryService/category.service';
import { LocalStorageService } from '@app/core/services/LocalStorageService/local-storage.service';
import {
    FetchCategories,
    FetchCategoriesSuccess,
    FetchCategoriesFailure,
    MoveCategory,
    MoveCategorySuccess,
    MoveCategoryFailure,
    DeleteCategory,
    DeleteCategorySuccess,
    DeleteCategoryFailure
    } from '@app/shared/ngrx-store/actions/category.actions';

@Injectable()
export class CategoryEffects {

  constructor(
    private actions: Actions,
    private categoryService: CategoryService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private permissionsService: NgxPermissionsService
  ) {}

  @Effect()
  FetchCategory: Observable<Action> = this.actions
    .ofType(CategoriesActionTypes.FETCH_CATEGORIES)
    .map((action: FetchCategories) => action.payload)
    .switchMap(payload => {
      return this.categoryService.getFilteredAndSorted(payload)
        .map((data) => {
          return new FetchCategoriesSuccess(data);
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new FetchCategoriesFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  FetchCategorySuccess: Observable<any> = this.actions.pipe(
    ofType(CategoriesActionTypes.FETCH_CATEGORIES_SUCCESS),
    tap(({payload: categoryData}) => {
    })
  );

  @Effect({ dispatch: false })
  FetchCategoryFailure: Observable<any> = this.actions.pipe(
    ofType(CategoriesActionTypes.FETCH_CATEGORIES_FAILURE)
  );

  @Effect()
  MoveCategory: Observable<Action> = this.actions
    .ofType(CategoriesActionTypes.MOVE_CATEGORY)
    .map((action: MoveCategory) => action.payload)
    .switchMap(payload => {
      return this.categoryService.moveCategory(payload)
        .map((data) => {
          return new MoveCategorySuccess(data);
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new MoveCategoryFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  MoveCategorySuccess: Observable<any> = this.actions.pipe(
    ofType(CategoriesActionTypes.MOVE_CATEGORY_SUCCESS),
    tap(({payload: categoryData}) => {
    })
  );

  @Effect({ dispatch: false })
  MoveCategoryFailure: Observable<any> = this.actions.pipe(
    ofType(CategoriesActionTypes.MOVE_CATEGORY_FAILURE)
  );

  @Effect()
  DeleteCategory: Observable<Action> = this.actions
    .ofType(CategoriesActionTypes.DELETE_CATEGORY)
    .map((action: DeleteCategory) => action.payload)
    .switchMap(payload => {
      return this.categoryService.deleteCategory(payload)
        .map((data) => {
          return new DeleteCategorySuccess(data);
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new DeleteCategoryFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  DeleteCategorySuccess: Observable<any> = this.actions.pipe(
    ofType(CategoriesActionTypes.DELETE_CATEGORY_SUCCESS),
    tap(({payload: categoryData}) => {
    })
  );

  @Effect({ dispatch: false })
  DeleteCategoryFailure: Observable<any> = this.actions.pipe(
    ofType(CategoriesActionTypes.DELETE_CATEGORY_FAILURE)
  );

}
