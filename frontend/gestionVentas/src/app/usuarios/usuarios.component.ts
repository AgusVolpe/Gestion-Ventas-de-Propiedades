import { Component, OnInit, inject } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UsuarioData } from './interface/usuario-data.interface';
import { ModalUsuariosComponent } from './modal-usuarios/modal-usuarios.component';
import { EstadoReserva } from '../reservas/interface/estadoReserva.enum';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit{
  title: string = 'Seccion Usuarios';

  subscription$!: Subscription;
  private usuariosService = inject(UsuariosService);
  usuarios: UsuarioData[] = [];
  columnsToDisplay: string[] = ['usuario', 'ingresadas', 'aprobadas', 'rechazadas', 'canceladas', 'totalVentas', 'roles', 'opciones'];
  // columnsToDisplay: string[] = ['usuario', 'header-row-second-group', 'opciones'];

  constructor(public dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.getUsuarios();
    
    this.subscription$ = this.usuariosService.refresh$.subscribe(() => {
      this.getUsuarios();
    });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  getUsuarios(): void{
    this.usuariosService.getUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
        console.log("Usuarios: ", this.usuarios);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  abrirModal(id: any):void {
    const dialogRef = this.dialog.open(ModalUsuariosComponent, {
      width: '350px',
      data:{
        id: id
      }
    });
    dialogRef.afterClosed().subscribe();
  }

  addRole(id: number) {
    this.abrirModal(id);
  }

  removeUser(userId: string){
    this.usuariosService.removeUser(userId).subscribe();
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

  getCantReservas(user: UsuarioData){
    const reservas = user.reservas;
    var cantIngr = 0;
    var cantApro = 0;
    var cantRech = 0;
    var cantCanc = 0;
    var totVent = 0;
    for(var reserva of reservas){
      switch(reserva.estado){
        case EstadoReserva.Ingresada:
          cantIngr++;
          break;
        case EstadoReserva.Aprobada:
          cantApro++;
          totVent += reserva.producto.precio;
          break;
        case EstadoReserva.Rechazada:
          cantRech++;
          break;
        case EstadoReserva.Cancelada:
          cantCanc++;
          break;
        default:
          break;
      }
    }
    return [cantIngr,cantApro,cantRech,cantCanc,totVent];
  }


  removeRole(userId:string, roleId:string){
    this.usuariosService.removeRoleToUser(userId,roleId).subscribe();
  }
}
