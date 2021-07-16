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
