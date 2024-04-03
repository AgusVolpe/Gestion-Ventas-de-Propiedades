import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ReservasService } from './reservas.service';
import { Reserva } from './interface/reserva.interface';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ModalReservaComponent } from './modal-reserva/modal-reserva.component'; 
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ReservasComponent implements OnInit, OnDestroy{
  title: string = 'Seccion Reservas'
  
  subscription$!: Subscription;
  mostrarModal: boolean = false;
  private reservasService = inject(ReservasService);
  private authService = inject(AuthService);
  reservas: Reserva[] = [];
  reserva!: Reserva;

  constructor(public dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.getReservas();
    
    this.subscription$ = this.reservasService.refresh$.subscribe(() => {
      this.getReservas();
    });
  }
  
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    console.log('Suscripcion eliminada');
  }

  columnsToDisplay: string[] = ['id', 'producto', 'usuario', 'nombreCliente', 'estado', 'opciones'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];

  getReservas(): void{
    this.reservasService.getReservas().subscribe({
      next: (reservas) => {
        this.reservas = reservas;
        console.log("reservas", this.reservas) 
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  abrirModal():void {
    const dialogRef = this.dialog.open(ModalReservaComponent, {
      width: '350px'
    });

    // const dialogRef = this.dialog.open(ModalReservaComponent, {
    //   reserva: {Barrio: String, idProducto: String, idUsuario: String, nombreCliente: this.reserva.nombreCliente}
    // });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialogo cerrado: Resultado = ${result}`);
      //this.reserva = result;
    });
  }

  //addData(reserva: Reserva) {
  addData() {

  }

  updateData() {
  }

  removeData(id: number): void {
    this.reservasService.removeReserva(id).subscribe();
    console.log('reserva eliminada');
  }

  estadoSegunNumero(estado: number): string | null {
    switch (estado) {
      case 0:
        return 'Ingresada'
      case 1:
        return 'Cancelada'
      case 2:
        return 'Aprobada'
      case 3:
        return 'Rechazada'
      default:
        return null
    }
  }

  getRole(){
    return this.authService.getRoleUsuario();
  }
}
