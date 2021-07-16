import { createReducer, on } from '@ngrx/store';
import { assocPath, lensPath, view, path, mergeRight } from 'ramda';

import { initialFormState } from './initialState';
import { IForm } from '../types';
import * as formActions from './form.actions';
import * as arrayActions from './array.actions';

const _formReducer = createReducer<IForm>(
  initialFormState,
  on(formActions.saveForm, (state, payload) => {
    const copy = path(payload.path, state);
    return assocPath(
      payload.path,
      mergeRight(copy as object, payload.value),
      state
    );
  }),
  on(arrayActions.addIntoArray, (state, { value, path }) => {
    const lensForProp = lensPath(path);
    const propValue = view(lensForProp, state);
    return assocPath(
      path,
      ((propValue as Array<any>) || []).concat(value),
      state
    );
  }),
  on(arrayActions.removeFromArray, (state, { index, path }) => {
    const lensForProp = lensPath(path);
    const propValue = view(lensForProp, state);
    // check if index passed is greater than 0 and less than the last index in the array
    if (!propValue || index < 0 || index > propValue.length - 1) {
      return state;
    }
    const copy = propValue.slice();
    copy.splice(index, 1); // delete element from copy

    return assocPath(path, copy, state);
  })
);

export function formReducer(state, action) {
  return _formReducer(state, action);
}
