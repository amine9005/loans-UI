import { createAction, props } from '@ngrx/store';
import { userSate } from './user.types';

export const loggedIn = createAction('loggedIn', props<userSate>());
export const loggedOut = createAction('loggedOut');
