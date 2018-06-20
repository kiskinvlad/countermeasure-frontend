import { Action } from '@ngrx/store';
import { CategoriesActionTypes } from '@app/shared/ngrx-store/constants/category';
/**
 * Fetch categories data action
 * Called when try to fetch categories data
 */
export class FetchCategories implements Action {
  readonly type = CategoriesActionTypes.FETCH_CATEGORIES;
  constructor(public payload: any) {}
}
/**
 * Fetch categories data success action
 * Called when categories data fetched successful
 */
export class FetchCategoriesSuccess implements Action {
  readonly type = CategoriesActionTypes.FETCH_CATEGORIES_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Fetch categories data failure action
 * Called when categories data fetched failure
 */
export class FetchCategoriesFailure implements Action {
  readonly type = CategoriesActionTypes.FETCH_CATEGORIES_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Fetch category data action
 * Called when try to fetch category data
 */
export class FetchCategory implements Action {
  readonly type = CategoriesActionTypes.FETCH_CATEGORY;
  constructor(public payload: any) {}
}
/**
 * Fetch category data success action
 * Called when category data fetched successful
 */
export class FetchCategorySuccess implements Action {
  readonly type = CategoriesActionTypes.FETCH_CATEGORY_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Fetch category data failure action
 * Called when category data fetched failure
 */
export class FetchCategoryFailure implements Action {
  readonly type = CategoriesActionTypes.FETCH_CATEGORY_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Move category action
 * Called when try to change category position
 */
export class MoveCategory implements Action {
  readonly type = CategoriesActionTypes.MOVE_CATEGORY;
  constructor(public payload: any) {}
}
/**
 * Move category success action
 * Called when category change position successful
 */
export class MoveCategorySuccess implements Action {
  readonly type = CategoriesActionTypes.MOVE_CATEGORY_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Move category failure action
 * Called when category change position failure
 */
export class MoveCategoryFailure implements Action {
  readonly type = CategoriesActionTypes.MOVE_CATEGORY_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Delete category from list action
 * Called when try to delete category from list
 */
export class DeleteCategoryFromList implements Action {
  readonly type = CategoriesActionTypes.DELETE_CATEGORY_FROM_LIST;
  constructor(public payload: any) {}
}
/**
 * Delete category from list success action
 * Called when delete category from list successful
 */
export class DeleteCategoryFromListSuccess implements Action {
  readonly type = CategoriesActionTypes.DELETE_CATEGORY_FROM_LIST_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Delete category from list failure action
 * Called when delete category from list failure
 */
export class DeleteCategoryFromListFailure implements Action {
  readonly type = CategoriesActionTypes.DELETE_CATEGORY_FROM_LIST_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Delete category action
 * Called when try to delete category
 */
export class DeleteCategory implements Action {
  readonly type = CategoriesActionTypes.DELETE_CATEGORY;
  constructor(public payload: any) {}
}
/**
 * Delete category success action
 * Called when delete category successful
 */
export class DeleteCategorySuccess implements Action {
  readonly type = CategoriesActionTypes.DELETE_CATEGORY_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Delete category failure action
 * Called when delete category failure
 */
export class DeleteCategoryFailure implements Action {
  readonly type = CategoriesActionTypes.DELETE_CATEGORY_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Update category action
 * Called when try to update category
 */
export class UpdateCategory implements Action {
  readonly type = CategoriesActionTypes.UPDATE_CATEGORY;
  constructor(public payload: any) {}
}
/**
 * Update category success action
 * Called when update category successful
 */
export class UpdateCategorySuccess implements Action {
  readonly type = CategoriesActionTypes.UPDATE_CATEGORY_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Update category failure action
 * Called when update category failure
 */
export class UpdateCategoryFailure implements Action {
  readonly type = CategoriesActionTypes.UPDATE_CATEGORY_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Create category action
 * Called when try to create category
 */
export class CreateCategory implements Action {
  readonly type = CategoriesActionTypes.CREATE_CATEGORY;
  constructor(public payload: any) {}
}
/**
 * Create category success action
 * Called when create category successful
 */
export class CreateCategorySuccess implements Action {
  readonly type = CategoriesActionTypes.CREATE_CATEGORY_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Create category failure action
 * Called when create category failure
 */
export class CreateCategoryFailure implements Action {
  readonly type = CategoriesActionTypes.CREATE_CATEGORY_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Action types
 * Export action types
 */
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
  | CreateCategoryFailure;

