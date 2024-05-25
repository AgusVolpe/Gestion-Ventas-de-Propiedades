import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UsuarioData } from './interface/usuario-data.interface';
import { ModalUsuariosComponent } from './modal-usuarios/modal-usuarios.component';
import { EstadoReserva } from '../reservas/interface/estadoReserva.enum';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit, AfterViewInit{
  title: string = 'Sección Usuarios';

  subscription$!: Subscription;
  private usuariosService = inject(UsuariosService);
  usuarios: UsuarioData[] = [];
  dataSource = new MatTableDataSource<UsuarioData>(this.usuarios);
  columnsToDisplay: string[] = ['usuario', 'ingresadas', 'aprobadas', 'rechazadas', 'canceladas', 'totalVentas', 'roles', 'opciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.getUsuarios();
    this.subscription$ = this.usuariosService.refresh$.subscribe(() => {
      this.getUsuarios();
    });

    this.dataSource.filterPredicate = (data: UsuarioData, filter: string) => {
      const transformedFilter = filter.trim().toLowerCase();

      const accumulator = (currentTerm: string, key: string) => {
        const value = data[key as keyof UsuarioData];
        return currentTerm + (value != null ? value.toString().toLowerCase() : '');
      };

      const dataStr = Object.keys(data).reduce(accumulator, '');

      const reservasDataStr = this.getCantReservas(data).join('').toLowerCase();

      return dataStr.includes(transformedFilter) || reservasDataStr.includes(transformedFilter);
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUsuarios(): void{
    this.usuariosService.getUsuarios().subscribe({
      next: (usuarios) => {
        this.dataSource.data = usuarios;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  abrirModalConUsuario(user: UsuarioData):void {
    const dialogRef = this.dialog.open(ModalUsuariosComponent, {
      width: '350px',
      data:{
        user: user
      }
    });
    dialogRef.afterClosed().subscribe();
  }

  abrirModalConRol(roleId: string):void {
    const dialogRef = this.dialog.open(ModalUsuariosComponent, {
      width: '350px',
      data:{
        roleId: roleId
      }
    });
    dialogRef.afterClosed().subscribe();
  }

  addRoleToUser(user: UsuarioData) {
    this.abrirModalConUsuario(user);
  }

  addNewRol(){

  }

  deleteRol(){

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
    return [cantIngr.toString(),cantApro.toString(),cantRech.toString(),cantCanc.toString(),totVent.toString()];
  }


  removeRoleToUser(userId:string, roleId:string){
    this.usuariosService.removeRoleToUser(userId,roleId).subscribe();
  }
}
