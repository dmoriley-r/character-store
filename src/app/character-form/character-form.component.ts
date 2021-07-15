import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { addIntoArray, saveForm } from '../store';
import { IAppState, ICharacter } from '../types';

@Component({
  selector: 'character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss'],
})
export class CharacterFormComponent implements OnInit, OnDestroy {
  @ViewChild(NgForm, { static: true }) myForm: NgForm;
  public character: ICharacter;
  private subscription: Subscription | undefined;

  skills: string[] = [
    'Drinking',
    'Swords',
    'Archery',
    'Spells',
    'Ironwork',
    'Singing',
  ];

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    // Subscribe to the form in state.
    this.subscription = this.store
      .select((state) => state.form.character)
      .subscribe((characterFormState) => {
        this.character = { ...characterFormState };
      });

    // Dispatch an action when the form is changed.
    this.subscription = this.myForm.valueChanges
      ?.pipe(debounceTime(0))
      .subscribe((change) => {
        console.log(JSON.stringify(change, null, 2));
        this.store.dispatch(saveForm(change));
      });
  }

  addSkill(input: HTMLInputElement) {
    this.store.dispatch(
      addIntoArray({ value: input.value, path: ['character', 'skills'] })
    );
    input.value = ''; // clear input
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
