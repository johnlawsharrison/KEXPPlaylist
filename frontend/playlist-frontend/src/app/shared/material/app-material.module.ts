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

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class AppMaterialModule { }
