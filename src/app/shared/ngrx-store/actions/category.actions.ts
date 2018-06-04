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

export class FetchCategory implements Action {
  readonly type = CategoriesActionTypes.FETCH_CATEGORY;
  constructor(public payload: any) {}
}

export class FetchCategorySuccess implements Action {
  readonly type = CategoriesActionTypes.FETCH_CATEGORY_SUCCESS;
  constructor(public payload: any) {}
}

export class FetchCategoryFailure implements Action {
  readonly type = CategoriesActionTypes.FETCH_CATEGORY_FAILURE;
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

export class DeleteCategoryFromList implements Action {
  readonly type = CategoriesActionTypes.DELETE_CATEGORY_FROM_LIST;
  constructor(public payload: any) {}
}

export class DeleteCategoryFromListSuccess implements Action {
  readonly type = CategoriesActionTypes.DELETE_CATEGORY_FROM_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class DeleteCategoryFromListFailure implements Action {
  readonly type = CategoriesActionTypes.DELETE_CATEGORY_FROM_LIST_FAILURE;
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

export class UpdateCategory implements Action {
  readonly type = CategoriesActionTypes.UPDATE_CATEGORY;
  constructor(public payload: any) {}
}

export class UpdateCategorySuccess implements Action {
  readonly type = CategoriesActionTypes.UPDATE_CATEGORY_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdateCategoryFailure implements Action {
  readonly type = CategoriesActionTypes.UPDATE_CATEGORY_FAILURE;
  constructor(public payload: any) {}
}

export class CreateCategory implements Action {
  readonly type = CategoriesActionTypes.CREATE_CATEGORY;
  constructor(public payload: any) {}
}

export class CreateCategorySuccess implements Action {
  readonly type = CategoriesActionTypes.CREATE_CATEGORY_SUCCESS;
  constructor(public payload: any) {}
}

export class CreateCategoryFailure implements Action {
  readonly type = CategoriesActionTypes.CREATE_CATEGORY_FAILURE;
  constructor(public payload: any) {}
}

export class CreateCategoriesSummaryCsv implements Action {
  readonly type = CategoriesActionTypes.CREATE_CATEGORIES_SUMMARY_CSV;
  constructor(public payload: any) {}
}

export class CreateCategoriesSummaryCsvSuccess implements Action {
  readonly type = CategoriesActionTypes.CREATE_CATEGORIES_SUMMARY_CSV_SUCCESS;
  constructor(public payload: any) {}
}

export class CreateCategoriesSummaryCsvFailure implements Action {
  readonly type = CategoriesActionTypes.CREATE_CATEGORIES_SUMMARY_CSV_FAILURE;
  constructor(public payload: any) {}
}

export type All =
  | FetchCategories
  | FetchCategoriesSuccess
  | FetchCategoriesFailure
  | MoveCategory
  | MoveCategorySuccess
  | MoveCategoryFailure
  | DeleteCategoryFromList
  | DeleteCategoryFromListSuccess
  | DeleteCategoryFromListFailure
  | FetchCategory
  | FetchCategorySuccess
  | FetchCategoryFailure
  | DeleteCategory
  | DeleteCategorySuccess
  | DeleteCategoryFailure
  | UpdateCategory
  | UpdateCategorySuccess
  | UpdateCategoryFailure
  | CreateCategory
  | CreateCategorySuccess
  | CreateCategoryFailure
  | CreateCategoriesSummaryCsv
  | CreateCategoriesSummaryCsvSuccess
  | CreateCategoriesSummaryCsvFailure;

