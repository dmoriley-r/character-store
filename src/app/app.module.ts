import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { CharacterFormComponent } from './character-form/character-form.component';
import { formReducer } from './store';
import { IAppState } from './types';

@NgModule({
  declarations: [AppComponent, CharacterFormComponent],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot<IAppState>({ form: formReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
