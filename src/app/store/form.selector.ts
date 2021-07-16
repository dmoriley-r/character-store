import { createSelector } from '@ngrx/store';
import { IAppState, ICharacter, IForm } from '../types';

export const formStateSelector = (state: IAppState) => state.form;

export const characterFormSelector = createSelector(
  formStateSelector,
  (form: IForm) => form.character
);

export const bioSummarySelector = createSelector(
  characterFormSelector,
  ({ bioSummary }: ICharacter) => bioSummary
);
