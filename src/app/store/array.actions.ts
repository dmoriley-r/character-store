import { createAction, props } from '@ngrx/store';
import { Path } from 'ramda';

export const addIntoArray = createAction(
  '[Array] add',
  props<{ value: any; path: Path }>()
);
export const updateInArray = createAction(
  '[Array] update',
  props<{ path: Path; value: any; index: number }>()
);
export const removeFromArray = createAction(
  '[Array] remove',
  props<{ index: number; path: Path }>()
);
