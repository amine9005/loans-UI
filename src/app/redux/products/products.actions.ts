import { createAction, props } from '@ngrx/store';
import { response } from './products.types';

export const setProducts = createAction('setProducts', props<response>());
