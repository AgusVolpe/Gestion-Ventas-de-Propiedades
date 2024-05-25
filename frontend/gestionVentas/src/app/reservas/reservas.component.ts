import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ReservasService } from './reservas.service';
import { Reserva } from './interface/reserva.interface';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ModalReservaComponent } from './modal-reserva/modal-reserva.component'; 
import { AuthService } from '../auth/auth.service';
import { EstadoReserva } from './interface/estadoReserva.enum';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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
export class ReservasComponent implements OnInit, OnDestroy, AfterViewInit{
  title: string = 'Sección Reservas'
  
  subscription$!: Subscription;
  mostrarModal: boolean = false;
  private reservasService = inject(ReservasService);
  private authService = inject(AuthService);
  reservas: Reserva[] = [];
  dataSource = new MatTableDataSource<Reserva>(this.reservas);
  reserva!: Reserva;
  estado!: EstadoReserva;
  columnsToDisplay: string[] = ['producto', 'usuario', 'nombreCliente', 'estado', 'opciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.getReservas();
    
    this.subscription$ = this.reservasService.refresh$.subscribe(() => {
      this.getReservas();
    });
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  getReservas(): void{
    this.reservasService.getReservas().subscribe({
      next: (reservas) => {
        // this.reservas = reservas;
        this.dataSource.data = reservas;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  abrirModal(id: any):void {
    const dialogRef = this.dialog.open(ModalReservaComponent, {
      width: '350px',
      data:{
        id: id
      }
    });
    dialogRef.afterClosed().subscribe();
  }

  addData() {
    this.abrirModal('');
  }
  
  updateData(id: number) {
    this.abrirModal(id);
  }

  cancelarReserva(id:any){
    this.reservasService.updateReserva(id, 3).subscribe();
  }

  removeData(id: number): void {
    this.reservasService.removeReserva(id).subscribe();
  }
}
