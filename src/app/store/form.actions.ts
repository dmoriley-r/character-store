import { createAction, props } from '@ngrx/store';
import { Path } from 'ramda';
import { IForm } from '../types';

export const saveForm = createAction(
  '[Form] Save',
  props<{ path: Path; value: any }>()
);
