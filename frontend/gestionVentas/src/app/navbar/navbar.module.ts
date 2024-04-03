import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { MaterialModule } from '../shared/material/material.module';


@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
