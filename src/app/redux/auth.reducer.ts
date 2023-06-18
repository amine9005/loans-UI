import { loggedIn, loggedOut } from './auth.actions';
import { userInitialState } from './auth.store';
import { Action, createReducer, on } from '@ngrx/store';
import { userSate } from './user.types';

const _userAuthReducer = createReducer(
  userInitialState,
  on(loggedIn, (state, action) => {
    return {
      ...state,
      isLoggedIn: action.isLoggedIn,
      // username: action.username,
      token: action.token,
    };
  }),
  on(loggedOut, (state) => {
    return {
      ...state,
      isLoggedIn: false,
      // username: '',
      token: '',
    };
  })
);

export function userAuthReducer(state: userSate | undefined, action: Action) {
  return _userAuthReducer(state, action);
}
