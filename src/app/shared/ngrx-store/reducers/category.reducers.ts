
import { CategoriesActionTypes } from '@app/shared/ngrx-store/constants/category';
import { Category } from '@app/shared/models/category';
import { All } from '@app/shared/ngrx-store/actions/category.actions';


export interface State {
  categories: Category[];
  totalCount: Number;
  page_number: Number;
  items_per_page: Number;
  errorMessage: string | null;
}

export const initialState: State = {
  categories: [],
  totalCount: 0,
  page_number: 1,
  items_per_page: 2,
  errorMessage: null
};

export function reducer(state = initialState, action: All): State {
  console.log('category reducer', action.type);
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
    case CategoriesActionTypes.DELETE_CATEGORY_SUCCESS: {
      return {
        ...state,
        categories: action.payload.categories,
        page_number: action.payload.page_number,
        totalCount: action.payload.totalCount,
        items_per_page: action.payload.items_per_page,
        errorMessage: null
      };
    }
    case CategoriesActionTypes.DELETE_CATEGORY_FAILURE: {
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
