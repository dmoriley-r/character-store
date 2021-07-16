import { createSelector } from '@ngrx/store';
import { IBioSummary } from '../types';
import {
  elfAgeValid,
  humanAgeValid,
  tieflingAgeValid,
} from '../utils/ageValidators';
import { bioSummarySelector, characterFormSelector } from './form.selector';

// age selectors

export const ageValidationSelector = createSelector(
  bioSummarySelector,
  (bioSummary: IBioSummary) => {
    switch (bioSummary.race.toLowerCase()) {
      case 'human':
        return humanAgeValid;
      case 'elf':
        return elfAgeValid;
      case 'tiefling':
        return tieflingAgeValid;
      default:
        return (value) => value > 0; // age default to true if not one of the selected races
    }
  }
);

export const isAgeValidSelector = createSelector(
  bioSummarySelector,
  ageValidationSelector,
  ({ age }, isAgeValid) => isAgeValid(age)
);

// Name selectors

const maxStringLengthValidation = (value: string, max: number) =>
  value.length < max;

const minStringLengthValidation = (value: string, min: number) =>
  value.length > min;

export const isNameValidSelector = createSelector(
  characterFormSelector,
  ({ name = '' }) =>
    maxStringLengthValidation(name, 50) && minStringLengthValidation(name, 3)
);

// form selectors

export const isFormValid = createSelector(
  characterFormSelector,
  // conveted whole expression to boolean for type safe
  (character) =>
    Boolean(
      character.name && character.bioSummary.age && character.skills?.length > 0
    )
);

export const isFormValidSelector = createSelector(
  isAgeValidSelector,
  isNameValidSelector,
  (ageValid, nameValid) => ageValid && nameValid
);
