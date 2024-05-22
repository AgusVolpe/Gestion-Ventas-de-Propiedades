import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { EstadoReserva } from '../interface/estadoReserva.enum';
import { ReservasService } from '../reservas.service';
import { ReservaCreacion } from '../interface/reserva-creacion.interface';
import { ProductosService } from '../../productos/productos.service';

@Component({
  selector: 'app-modal-reserva',
  templateUrl: './modal-reserva.component.html',
  styleUrl: './modal-reserva.component.css'
})
export class ModalReservaComponent implements OnInit{
  
  dialogForm!: FormGroup;
  barrioInput: string = '';
  estado!: EstadoReserva;
  EstadoReserva = EstadoReserva;
  productos: any[] = [];
  negar: boolean = false;

  private authService = inject(AuthService);
  private reservasService = inject(ReservasService);
  private productosService = inject(ProductosService);

  constructor(
    public dialogRef: MatDialogRef<ModalReservaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) {
      this.dialogForm = this.fb.group({
        productoId: ['', Validators.required],
        usuarioId: [this.authService.getIdUsuario(), Validators.required],
        nombreCliente: ['', Validators.required],
      });
      if(this.getRole() == "Vendedor"){
        this.negar = this.negarReserva(this.getId());
      }
  }

  ngOnInit(): void {
    this.getProductosDisponibles();

  }

  guardarReserva(): void {
    if(this.dialogForm.valid){
      const { productoId, usuarioId, nombreCliente } = this.dialogForm.value;
      
      const ReservaCreacion: ReservaCreacion = {
        productoId: productoId,
        usuarioId: usuarioId,
        nombreCliente: nombreCliente
      };
      
      this.reservasService.addReserva(ReservaCreacion, this.barrioInput).subscribe({
        next: (reserva) => {
          this.dialogForm.reset();
          this.barrioInput = '';
          this.dialogRef.close();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }else{

    }
  }
  
  getProductosDisponibles(){
    this.productosService.getProductosDisponibles().subscribe(result => {
      this.productos = result;
    });
  }
  
  getRole(){
    return this.authService.getRoleUsuario();
  }
  
  actualizarEstado(){
    if(this.data.id != null && this.data.id != ''){
      console.log("Estado Reserva: ", this.estado);
      this.reservasService.updateReserva(this.data.id,this.numeroSegunEstado(this.estado)).subscribe({
        next: (reserva) => {
          this.dialogRef.close();
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  negarReserva(id: any): any{
    this.reservasService.negarReserva(id).subscribe({
      next: (reserva) => {
        this.negar = reserva;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getId(){
    return this.authService.getIdUsuario();
  }

  numeroSegunEstado(estado: EstadoReserva): number {
    switch (estado) {
      case EstadoReserva.Ingresada:
        return 0
      case EstadoReserva.Cancelada:
        return 1
      case EstadoReserva.Aprobada:
        return 2
      case EstadoReserva.Rechazada:
        return 3
      default:
        return 0
    }
  }
}
