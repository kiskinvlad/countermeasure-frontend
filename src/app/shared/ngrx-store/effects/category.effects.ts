import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, filter, scan, tap, concatMap } from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/observable/from';

import { CategoriesActionTypes } from '@app/shared/ngrx-store/constants/category';
import { CategoryService } from '@app/core/services/CategoryService/category.service';
import {
    FetchCategories,
    FetchCategoriesSuccess,
    FetchCategoriesFailure,
    MoveCategory,
    MoveCategorySuccess,
    MoveCategoryFailure,
    DeleteCategoryFromList,
    DeleteCategoryFromListSuccess,
    DeleteCategoryFromListFailure,
    FetchCategory,
    FetchCategorySuccess,
    FetchCategoryFailure,
    DeleteCategory,
    DeleteCategorySuccess,
    DeleteCategoryFailure,
    UpdateCategory,
    UpdateCategorySuccess,
    UpdateCategoryFailure,
    CreateCategory,
    CreateCategorySuccess,
    CreateCategoryFailure,
    } from '@app/shared/ngrx-store/actions/category.actions';

@Injectable()
/**
 * Category side-effects service. {@link https://github.com/ngrx/effects/blob/master/docs/intro.md Effects}
 */
export class CategoryEffects {
/**
 * @param {number} case_id Current case id
 */
  private case_id: number;
/**
 * @constructor
 * @param {Actions} actions App ngrx action service
 * @param {CategoryService} categoryService Category service
 * @param {Router} router App router service
 * @param {NotificationsService} notificationsService App notification service
 */
  constructor(
    private actions: Actions,
    private categoryService: CategoryService,
    private router: Router,
    private notificationsService: NotificationsService
  ) {}

  @Effect()
  FetchCategories: Observable<Action> = this.actions
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
  FetchCategoriesSuccess: Observable<any> = this.actions.pipe(
    ofType(CategoriesActionTypes.FETCH_CATEGORIES_SUCCESS)
  );

  @Effect({ dispatch: false })
  FetchCategoriesFailure: Observable<any> = this.actions.pipe(
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
    ofType(CategoriesActionTypes.MOVE_CATEGORY_SUCCESS)
  );

  @Effect({ dispatch: false })
  MoveCategoryFailure: Observable<any> = this.actions.pipe(
    ofType(CategoriesActionTypes.MOVE_CATEGORY_FAILURE)
  );

  @Effect()
  DeleteCategoryFromList: Observable<Action> = this.actions
    .ofType(CategoriesActionTypes.DELETE_CATEGORY_FROM_LIST)
    .map((action: DeleteCategoryFromList) => action.payload)
    .switchMap(payload => {
      return this.categoryService.deleteCategoryFromList(payload)
        .map((data) => {
          return new DeleteCategoryFromListSuccess(data);
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new DeleteCategoryFromListFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  DeleteCategoryFromListSuccess: Observable<any> = this.actions.pipe(
    ofType(CategoriesActionTypes.DELETE_CATEGORY_FROM_LIST_SUCCESS)
  );

  @Effect({ dispatch: false })
  DeleteCategoryFromListFailure: Observable<any> = this.actions.pipe(
    ofType(CategoriesActionTypes.DELETE_CATEGORY_FROM_LIST_FAILURE)
  );

  @Effect()
  FetchCategory: Observable<Action> = this.actions
    .ofType(CategoriesActionTypes.FETCH_CATEGORY)
    .map((action: FetchCategory) => action.payload)
    .switchMap(payload => {
      return this.categoryService.getCategory(payload)
        .map((data) => {
          return new FetchCategorySuccess(data);
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new FetchCategoryFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  FetchCategorySuccess: Observable<any> = this.actions.pipe(
    ofType(CategoriesActionTypes.FETCH_CATEGORY_SUCCESS)
  );

  @Effect({ dispatch: false })
  FetchCategoryFailure: Observable<any> = this.actions.pipe(
    ofType(CategoriesActionTypes.FETCH_CATEGORY_FAILURE)
  );

  @Effect()
  DeleteCategory: Observable<Action> = this.actions
    .ofType(CategoriesActionTypes.DELETE_CATEGORY)
    .map((action: DeleteCategory) => action.payload)
    .switchMap(payload => {
      return this.categoryService.deleteCategory(payload)
        .map((data) => {
          return new DeleteCategorySuccess(payload);
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new DeleteCategoryFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  DeleteCategorySuccess: Observable<any> = this.actions.pipe(
    ofType(CategoriesActionTypes.DELETE_CATEGORY_SUCCESS),
    tap(({payload: data}) => {
      this.router.navigate(['/case', data.case_id, 'categories']);
      this.notificationsService.success('Success', 'Category ' + data.name + ' deleted');
    })
  );

  @Effect({ dispatch: false })
  DeleteCategoryFailure: Observable<any> = this.actions.pipe(
    ofType(CategoriesActionTypes.DELETE_CATEGORY_FAILURE),
    tap(() => {
      this.notificationsService.error('Failure', 'Category not deleted.');
    })
  );

  @Effect()
  UpdateCategory: Observable<Action> = this.actions
    .ofType(CategoriesActionTypes.UPDATE_CATEGORY)
    .map((action: UpdateCategory) => action.payload)
    .switchMap(payload => {
      return this.categoryService.updateCategory(payload)
        .map((data) => {
          return new UpdateCategorySuccess(data);
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new UpdateCategoryFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  UpdateCategorySuccess: Observable<any> = this.actions.pipe(
    ofType(CategoriesActionTypes.UPDATE_CATEGORY_SUCCESS),
    tap(({payload: data}) => {
      this.router.navigate(['/case', data.category.case_id, 'categories']);
      this.notificationsService.success('Successful', 'Category ' + data.category.name + ' updated');
    })
  );

  @Effect({ dispatch: false })
  UpdateCategoryFailure: Observable<any> = this.actions.pipe(
    ofType(CategoriesActionTypes.UPDATE_CATEGORY_FAILURE),
    tap(() => {
      this.notificationsService.error('Failure', 'Category not updated.');
    })
  );

  @Effect()
  CreateCategory: Observable<Action> = this.actions
    .ofType(CategoriesActionTypes.CREATE_CATEGORY)
    .map((action: CreateCategory) => action.payload)
    .switchMap(payload => {
      return this.categoryService.createCategory(payload)
        .map((data) => {
          return new CreateCategorySuccess(data);
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new CreateCategoryFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  CreateCategorySuccess: Observable<any> = this.actions.pipe(
    ofType(CategoriesActionTypes.CREATE_CATEGORY_SUCCESS),
    tap(({payload: data}) => {
      this.router.navigate(['/case', data.category.case_id, 'categories']);
      this.notificationsService.success('Successful', 'Category ' + data.category.name + ' created');
    })
  );

  @Effect({ dispatch: false })
  CreateCategoryFailure: Observable<any> = this.actions.pipe(
    ofType(CategoriesActionTypes.CREATE_CATEGORY_FAILURE),
    tap(() => {
      this.notificationsService.error('Failure', 'Category not created.');
    })
  );
}
