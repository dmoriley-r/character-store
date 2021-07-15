import { ICharacter, IForm } from '../types';

export const characterInitialState: ICharacter = {
  name: '',
  bioSummary: {
    age: 0,
    alignment: '',
    race: '',
  },
  skills: [],
};

export const initialFormState: IForm = {
  character: characterInitialState,
};
