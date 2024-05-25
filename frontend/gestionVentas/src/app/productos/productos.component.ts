import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ProductosService } from './productos.service';
import { Producto } from './interface/producto.interface';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalProductosComponent } from './modal-productos/modal-productos.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent implements OnInit, OnDestroy, AfterViewInit {
  title: string = 'Sección Productos';
  
  subscription$!: Subscription;
  private productosService = inject(ProductosService);
  private authService = inject(AuthService);
  productos: Producto[] = [];
  dataSource = new MatTableDataSource<Producto>(this.productos);
  columnsToDisplay: string[] = ['codigo', 'barrio', 'precio', 'estado', 'urlImagen', 'opciones'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.getProductos();
    
    this.subscription$ = this.productosService.refresh$.subscribe(() => {
      this.getProductos();
    });

    this.dataSource.filterPredicate = (data: Producto, filter: string | number) => {
      const transformedFilter = filter.toString().trim().toLowerCase();

      const accumulator = (currentTerm: string, key: string) => {
        const value = data[key as keyof Producto];
        return currentTerm + (value != null ? value.toString().toLowerCase() : '');
      };

      const dataStr = Object.keys(data).reduce(accumulator, '');

      // Include custom columns for filtering (like reservations and total sales)
      return dataStr.includes(transformedFilter);
    };
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
        // this.productos = productos;
        this.dataSource.data = productos;
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
