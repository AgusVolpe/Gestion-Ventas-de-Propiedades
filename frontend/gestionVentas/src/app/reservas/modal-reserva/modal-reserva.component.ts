import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Reserva } from '../interface/reserva.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { EstadoReserva } from '../interface/estadoReserva.enum';

@Component({
  selector: 'app-modal-reserva',
  templateUrl: './modal-reserva.component.html',
  styleUrl: './modal-reserva.component.css'
})
export class ModalReservaComponent implements OnInit{
  
  dialogForm!: FormGroup;
  barrioInput: string = '';
  estado!: EstadoReserva;

  private authService = inject(AuthService);

  reactiveForm = new FormGroup({
    idProducto: new FormControl("", Validators.required),
    idUsuario: new FormControl(this.authService.getIdUsuario(), Validators.required),
    nombreCliente: new FormControl("", Validators.required)
  });

  constructor(
    public dialogRef: MatDialogRef<ModalReservaComponent>,
    @Inject(MAT_DIALOG_DATA) public reserva: Reserva,
    private fb: FormBuilder) {
      this.dialogForm = this.fb.group({
        idProducto: ['', Validators.required],
        idUsuario: ['', Validators.required],
        nombreCliente: ['', Validators.required],
      });
  }

  ngOnInit(): void {
  }

  guardarReserva(): void {
    if(this.reactiveForm.valid){
      console.log("reactiveForm",this.reactiveForm.value);
      console.log(`Barrio es: ${this.barrioInput}`)
    }else{

    }
    
    // this.dialogRef.close(this.dialogForm);
    // console.log('modal guardado');
  }
  
  cerrarModal() {
    //this.mostrarFormulario = false;
    console.log('formulario cerrado');
  }

  addData(){

  }

  getRole(){
    return this.authService.getRoleUsuario();
  }

  actualizarEstado(){
    if(this.reactiveForm.valid){
      console.log(`El estado es: ${this.estado}`)
    }else{

    }
  }
}
