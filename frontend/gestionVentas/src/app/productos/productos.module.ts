import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos.component';
import { MaterialModule } from '../shared/material/material.module';
import { ModalProductosComponent } from './modal-productos/modal-productos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductosComponent,
    ModalProductosComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ProductosComponent, ModalProductosComponent
  ]
})
export class ProductosModule { }
