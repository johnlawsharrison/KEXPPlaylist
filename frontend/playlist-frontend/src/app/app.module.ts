import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppMaterialModule } from './shared/material/app-material.module';
import { PlaylistComponent } from './playlist/playlist.component';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { PlaylistItemComponent } from './playlist-item/playlist-item.component';
import { HttpXsrfInterceptor } from './custom-interceptor';
import { AuthorDialogComponent } from './author-dialog/author-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PlaylistComponent,
    PlaylistItemComponent,
    AuthorDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFToken'
    }),
    AppMaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AuthorDialogComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpXsrfInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
