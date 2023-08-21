import { createAction, props } from '@ngrx/store';
import { response } from './orders.types';

export const setOrders = createAction('setOrders', props<response>());
