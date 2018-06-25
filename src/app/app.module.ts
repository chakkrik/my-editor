import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ButtonModule} from 'primeng/button';

import { AppComponent } from './app.component';
import { CoEditorComponent } from './co-editor/co-editor.component';


@NgModule({
  declarations: [
    AppComponent,
    CoEditorComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
