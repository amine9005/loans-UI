import { createAction, props } from '@ngrx/store';
import { response } from './customers.types';

export const setCustomers = createAction('setCustomers', props<response>());
