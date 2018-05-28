import { Action } from '@ngrx/store';
import { CategoriesActionTypes } from '@app/shared/ngrx-store/constants/category';

export class FetchCategories implements Action {
  readonly type = CategoriesActionTypes.FETCH_CATEGORIES;
  constructor(public payload: any) {}
}

export class FetchCategoriesSuccess implements Action {
  readonly type = CategoriesActionTypes.FETCH_CATEGORIES_SUCCESS;
  constructor(public payload: any) {}
}

export class FetchCategoriesFailure implements Action {
  readonly type = CategoriesActionTypes.FETCH_CATEGORIES_FAILURE;
  constructor(public payload: any) {}
}

export class MoveCategory implements Action {
  readonly type = CategoriesActionTypes.MOVE_CATEGORY;
  constructor(public payload: any) {}
}

export class MoveCategorySuccess implements Action {
  readonly type = CategoriesActionTypes.MOVE_CATEGORY_SUCCESS;
  constructor(public payload: any) {}
}

export class MoveCategoryFailure implements Action {
  readonly type = CategoriesActionTypes.MOVE_CATEGORY_FAILURE;
  constructor(public payload: any) {}
}

export class DeleteCategory implements Action {
  readonly type = CategoriesActionTypes.DELETE_CATEGORY;
  constructor(public payload: any) {}
}

export class DeleteCategorySuccess implements Action {
  readonly type = CategoriesActionTypes.DELETE_CATEGORY_SUCCESS;
  constructor(public payload: any) {}
}

export class DeleteCategoryFailure implements Action {
  readonly type = CategoriesActionTypes.DELETE_CATEGORY_FAILURE;
  constructor(public payload: any) {}
}

export type All =
  | FetchCategories
  | FetchCategoriesSuccess
  | FetchCategoriesFailure
  | MoveCategory
  | MoveCategorySuccess
  | MoveCategoryFailure
  | DeleteCategory
  | DeleteCategorySuccess
  | DeleteCategoryFailure;

