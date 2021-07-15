import { createReducer, on } from '@ngrx/store';
import { initialFormState } from './initialState';
import { IForm } from '../types';
import * as formActions from './form.actions';

const _formReducer = createReducer<IForm>(
  initialFormState,
  // extract type from value being pushed to store for save
  on(formActions.saveForm, (state, { type, ...value }) => ({
    ...state,
    ...value,
  }))
);

export function formReducer(state, action) {
  return _formReducer(state, action);
}
