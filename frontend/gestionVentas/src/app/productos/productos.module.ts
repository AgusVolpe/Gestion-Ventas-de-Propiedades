import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos.component';
import { MaterialModule } from '../shared/material/material.module';



@NgModule({
  declarations: [
    ProductosComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ProductosComponent
  ]
})
export class ProductosModule { }
