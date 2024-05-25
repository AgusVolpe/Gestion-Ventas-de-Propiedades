import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalUsuariosComponent } from './modal-usuarios/modal-usuarios.component';
import { MaterialModule } from '../shared/material/material.module';
import { UsuariosComponent } from './usuarios.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UsuariosComponent,
    ModalUsuariosComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
  ],
  exports: [
    UsuariosComponent, ModalUsuariosComponent
  ]
})
export class UsuariosModule { }
