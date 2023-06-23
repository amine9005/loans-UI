import { setCustomers } from './customers.actions';
import { customersInit } from './customers.store';
import { Action, createReducer, on } from '@ngrx/store';
import { response } from './customers.types';

const _customersReducer = createReducer(
  customersInit,
  on(setCustomers, (state, action) => {
    return {
      ...state,
      isLoggedIn: action.isLoading,
      error: action.error,
      data: action.data,
    };
  })
);

export function customersReducer(state: response | undefined, action: Action) {
  return _customersReducer(state, action);
}
