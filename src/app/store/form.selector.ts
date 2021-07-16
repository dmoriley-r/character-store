import { createSelector } from '@ngrx/store';
import { IAppState, IForm } from '../types';

const formStateSelector = (state: IAppState) => state.form;

export const characterFormSelector = createSelector(
  formStateSelector,
  (form: IForm) => form.character
);

export const isFormValid = createSelector(
  characterFormSelector,
  // conveted whole expression to boolean for type safe
  (character) =>
    Boolean(
      character.name && character.bioSummary.age && character.skills?.length > 0
    )
);
