import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppMaterialModule } from './shared/material/app-material.module';
import { PlaylistComponent } from './playlist/playlist.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { PlaylistItemComponent } from './playlist-item/playlist-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PlaylistComponent,
    PlaylistItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppMaterialModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
