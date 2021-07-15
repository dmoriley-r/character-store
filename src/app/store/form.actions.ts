import { createAction, props } from '@ngrx/store';
import { IForm } from '../types';

export const saveForm = createAction('[Form] Save', props<IForm>());
