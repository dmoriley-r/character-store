import { createReducer, on } from '@ngrx/store';
import { assocPath, lensPath, view } from 'ramda';

import { initialFormState } from './initialState';
import { IForm } from '../types';
import * as formActions from './form.actions';
import * as arrayActions from './array.actions';

const _formReducer = createReducer<IForm>(
  initialFormState,
  // extract type from value being pushed to store for save
  on(formActions.saveForm, (state, { type, ...value }) => ({
    ...state,
    ...value,
  })),
  on(arrayActions.addIntoArray, (state, { value, path }) => {
    const lensForProp = lensPath(path);
    const propValue = view(lensForProp, state);
    return assocPath(
      path,
      ((propValue as Array<any>) || []).concat(value),
      state
    );
  })
);

export function formReducer(state, action) {
  return _formReducer(state, action);
}
