import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  formState$;

  constructor(private store: Store<IAppState>) {
    this.formState$ = store.select((state) => state.form);
  }
}
