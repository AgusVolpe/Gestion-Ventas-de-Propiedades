import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ProductosService } from './productos.service';
import { Producto } from './interface/producto.interface';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

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
  title: string = 'Seccion Productos'
  
  subscription$!: Subscription;
  private productosService = inject(ProductosService);
  private authService = inject(AuthService);
  productos: Producto[] = [];
  
  ngOnInit(): void {
    this.getProductos();
    
    this.subscription$ = this.productosService.refresh$.subscribe(() => {
      this.getProductos();
    });
  }
  
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    console.log('Suscripcion eliminada');
  }
  
  columnsToDisplay: string[] = ['id', 'codigo', 'barrio', 'precio', 'estado', 'urlImagen', 'opciones'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  
  getProductos(): void {
    this.productosService.getProductos().subscribe({
      next: (productos) => {
        this.productos = productos;
        console.log("productos", this.productos) 
      },
      error: (err) => {
        console.log(err);
      },
    }); 
  }

  addData() {
  }

  updateData() {
  }

  removeData(id: number) {
    this.productosService.removeProducto(id).subscribe();
    console.log('Producto eliminado');
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
}
