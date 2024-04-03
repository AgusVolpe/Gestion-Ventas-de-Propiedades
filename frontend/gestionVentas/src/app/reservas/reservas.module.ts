import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservasComponent } from './reservas.component';
import { MaterialModule } from '../shared/material/material.module';
import { ModalReservaComponent } from './modal-reserva/modal-reserva.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ReservasComponent, ModalReservaComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ReservasComponent, ModalReservaComponent
  ]
})
export class ReservasModule { }
