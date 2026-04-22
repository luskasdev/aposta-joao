import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { BrowserModule } from '@angular/platform-browser';
import { SHARED_COMPONENTS } from './components';

@NgModule({
  declarations: [
    ...SHARED_COMPONENTS,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    MaterialModule,
    RouterModule,
    CommonModule,
  ],
  providers: [
  ],
  exports: [
    ...SHARED_COMPONENTS,
  ]
})
export class SharedModule { }
