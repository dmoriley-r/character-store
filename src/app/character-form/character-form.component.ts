import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {
  addIntoArray,
  characterFormSelector,
  isAgeValidSelector,
  isFormValidSelector,
  isNameValidSelector,
  removeFromArray,
  saveForm,
} from '../store';
import { IAppState, ICharacter } from '../types';

@Component({
  selector: 'character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss'],
})
export class CharacterFormComponent implements OnInit, OnDestroy {
  isFormValid$: Observable<boolean>;
  isNameValid$: Observable<boolean>;
  isAgeValid$: Observable<boolean>;

  @ViewChild(NgForm, { static: true }) myForm: NgForm;
  public character: ICharacter;
  private subscription: Subscription | undefined;

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    // Subscribe to the form in state.
    this.subscription = this.store
      .select(characterFormSelector)
      .subscribe((characterFormState) => {
        this.character = { ...characterFormState };
      });

    // Dispatch an action when the form is changed.
    this.subscription = this.myForm.valueChanges
      ?.pipe(debounceTime(0))
      .subscribe((change) => {
        this.store.dispatch(
          saveForm({ path: ['character'], value: change.character })
        );
      });

    // selectors
    this.isFormValid$ = this.store.select(isFormValidSelector);
    this.isNameValid$ = this.store.select(isNameValidSelector);
    this.isAgeValid$ = this.store.select(isAgeValidSelector);
  }

  addSkill(input: HTMLInputElement) {
    if (input.value.length === 0) {
      return;
    }

    this.store.dispatch(
      addIntoArray({ value: input.value, path: ['character', 'skills'] })
    );
    input.value = ''; // clear input
  }

  removeSkill(index: number) {
    this.store.dispatch(
      removeFromArray({ index, path: ['character', 'skills'] })
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
