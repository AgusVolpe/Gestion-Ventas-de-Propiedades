import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ProductosService } from './productos.service';
import { Producto } from './interface/producto.interface';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalProductosComponent } from './modal-productos/modal-productos.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProductosComponent implements OnInit, OnDestroy {
  title: string = 'Seccion Productos';
  
  subscription$!: Subscription;
  private productosService = inject(ProductosService);
  private authService = inject(AuthService);
  productos: Producto[] = [];
  columnsToDisplay: string[] = ['codigo', 'barrio', 'precio', 'estado', 'urlImagen', 'opciones'];
    
  constructor(public dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.getProductos();
    
    this.subscription$ = this.productosService.refresh$.subscribe(() => {
      this.getProductos();
    });
  }
  
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
  
  estadoSegunNumero(estado: number): string | null {
    switch (estado) {
      case 0:
        return 'Disponible'
      case 1:
        return 'Reservado'
      case 2:
        return 'Vendido'
      default:
        return null
    }
  }

  getRole(){
    return this.authService.getRoleUsuario();
  }
  
  getProductos(): void {
    this.productosService.getProductos().subscribe({
      next: (productos) => {
        this.productos = productos;
      },
      error: (err) => {
        console.log(err);
      },
    }); 
  }

  abrirModal(id: any):void {
    const dialogRef = this.dialog.open(ModalProductosComponent, {
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

  removeData(id: number) {
    this.productosService.removeProducto(id).subscribe();
  }

}
