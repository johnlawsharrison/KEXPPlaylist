/*
The material module is designed to gather
all imports of Angular Material components
into one module for organization purposes

This module exports all these components, so
that when it is included itself in the 'shared'
component, they are made public to the rest of
the application.
*/
import { NgModule } from '@angular/core';

import {
  MatSidenavModule,
  MatToolbarModule,
  MatDividerModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule
} from '@angular/material';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule
  ]
})
export class AppMaterialModule { }
