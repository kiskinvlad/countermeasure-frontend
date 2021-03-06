
import { CategoriesActionTypes } from '@app/shared/ngrx-store/constants/category';
import { Category } from '@app/shared/models/category';
import { All } from '@app/shared/ngrx-store/actions/category.actions';
/**
 * Categories state interface
 */
export interface State {
/**
 * State params
 * @param {Category[]} categories Category models array state
 * @param {Category} category Current category model
 * @param {Number} totalCount Categories count param
 * @param {Number} page_number Page number param
 * @param {Number} items_per_page Categories count per page param
 * @param {string | null} errorMessage Error message param
 */
  categories: Category[];
  category: Category;
  totalCount: Number;
  page_number: Number;
  items_per_page: Number;
  errorMessage: string | null;
}
/**
 * Initial state
 */
export const initialState: State = {
  categories: [],
  category: null,
  totalCount: 0,
  page_number: 1,
  items_per_page: 10,
  errorMessage: null
};
/**
 * Category state reducer
 * @param {State} state
 * @param {All} action
 */
export function reducer(state: State = initialState, action: All): State {
  switch (action.type) {
    case CategoriesActionTypes.FETCH_CATEGORIES_SUCCESS: {
      return {
        ...state,
        categories: action.payload.categories,
        page_number: action.payload.page_number,
        totalCount: action.payload.totalCount,
        items_per_page: action.payload.items_per_page,
        errorMessage: null
      };
    }
    case CategoriesActionTypes.FETCH_CATEGORIES_FAILURE: {
      return {
        ...state,
        errorMessage: 'Cannot fetch categories.'
      };
    }
    case CategoriesActionTypes.MOVE_CATEGORY_SUCCESS: {
      return {
        ...state,
        categories: action.payload.categories,
        page_number: action.payload.page_number,
        totalCount: action.payload.totalCount,
        items_per_page: action.payload.items_per_page,
        errorMessage: null
      };
    }
    case CategoriesActionTypes.MOVE_CATEGORY_FAILURE: {
      return {
        ...state,
        errorMessage: 'Cannot move category.',
      };
    }
    case CategoriesActionTypes.DELETE_CATEGORY_FROM_LIST_SUCCESS: {
      return {
        ...state,
        categories: action.payload.categories,
        page_number: action.payload.page_number,
        totalCount: action.payload.totalCount,
        items_per_page: action.payload.items_per_page,
        errorMessage: null
      };
    }
    case CategoriesActionTypes.DELETE_CATEGORY_FROM_LIST_FAILURE: {
      return {
        ...state,
        errorMessage: 'Cannot delete category.',
      };
    }
    case CategoriesActionTypes.FETCH_CATEGORY_SUCCESS: {
      return {
        ...state,
        category: action.payload.category,
        errorMessage: null
      };
    }
    case CategoriesActionTypes.FETCH_CATEGORY_FAILURE: {
      return {
        ...state,
        errorMessage: 'Cannot fetch category.',
      };
    }
    case CategoriesActionTypes.DELETE_CATEGORY_SUCCESS: {
      return {
        ...state,
        errorMessage: null
      };
    }
    case CategoriesActionTypes.DELETE_CATEGORY_FAILURE: {
      return {
        ...state,
        errorMessage: 'Cannot delete category.',
      };
    }
    case CategoriesActionTypes.CREATE_CATEGORY_SUCCESS: {
      return {
        ...state,
        errorMessage: null
      };
    }
    case CategoriesActionTypes.CREATE_CATEGORY_FAILURE: {
      return {
        ...state,
        errorMessage: 'Cannot delete category.',
      };
    }
    case CategoriesActionTypes.UPDATE_CATEGORY_SUCCESS: {
      return {
        ...state,
        errorMessage: null
      };
    }
    case CategoriesActionTypes.UPDATE_CATEGORY_FAILURE: {
      return {
        ...state,
        errorMessage: 'Cannot delete category.',
      };
    }
    default: {
      return state;
    }
  }
}
