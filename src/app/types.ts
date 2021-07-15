export interface IForm {
  character: ICharacter; // our single top-level object (for now)
}

export interface ICharacter {
  name?: string; // optional name
  bioSummary: IBioSummary; // biographical information (see below)
  skills: string[]; // list of skills
}

export interface IBioSummary {
  age: number; // age in years
  alignment: string; // good or bad, lawful or chaotic
  race: string; // character's species
}

export interface IAppState {
  form: IForm;
}
