import { setProducts } from './products.actions';
import { productsInit } from './products.store';
import { Action, createReducer, on } from '@ngrx/store';
import { response } from './products.types';

const _productsReducer = createReducer(
  productsInit,
  on(setProducts, (state, action) => {
    return {
      ...state,
      isLoading: action.isLoading,
      error: action.error,
      data: action.data,
    };
  })
);

export function productsReducer(state: response | undefined, action: Action) {
  return _productsReducer(state, action);
}
