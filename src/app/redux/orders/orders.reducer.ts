import { setOrders } from './orders.actions';
import { ordersInit } from './orders.store';
import { Action, createReducer, on } from '@ngrx/store';
import { response } from './orders.types';

const _ordersReducer = createReducer(
  ordersInit,
  on(setOrders, (state, action) => {
    return {
      ...state,
      isLoading: action.isLoading,
      error: action.error,
      data: action.data,
    };
  })
);

export function ordersReducer(state: response | undefined, action: Action) {
  return _ordersReducer(state, action);
}
