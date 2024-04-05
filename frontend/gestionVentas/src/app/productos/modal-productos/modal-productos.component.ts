import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoCreacion } from '../interface/producto-creacion.interface';
import { ProductosService } from '../productos.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Producto } from '../interface/producto.interface';

@Component({
  selector: 'app-modal-productos',
  templateUrl: './modal-productos.component.html',
  styleUrl: './modal-productos.component.css'
})
export class ModalProductosComponent implements OnInit{
  
  dialogForm!: FormGroup;
  editProducto: any;
  
  private productosService = inject(ProductosService);
  
  constructor(public dialogRef: MatDialogRef<ModalProductosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) {
    this.dialogForm = this.fb.group({
      codigo: ['', Validators.required],
      barrio: ['', Validators.required],
      precio: ['', Validators.required],
      urlImagen: [''],
    });
  }

  ngOnInit(): void {
    if(this.data.id != null && this.data.id != ''){
      this.getEditProducto(this.data.id);
    }
  }

  getEditProducto(id: number){
    this.productosService.getProducto(id).subscribe(prod =>{
      this.editProducto = prod;
      console.log(this.editProducto);
      this.dialogForm.setValue({
        codigo: this.editProducto.codigo, 
        barrio: this.editProducto.barrio,
        precio: this.editProducto.precio,
        urlImagen: this.editProducto.urlImagen,
      });
    });
  }

  guardarProducto(): void {
   if(this.dialogForm.valid){
      console.log("reactiveForm",this.dialogForm.value);

      const { codigo, barrio, precio, urlImagen } = this.dialogForm.value;
  
      const ProductoCreacion: ProductoCreacion = {
        codigo: codigo,
        barrio: barrio,
        precio: precio,
        urlImagen: urlImagen
      };
  
      if(this.data.id != null && this.data.id != ''){
        this.productosService.updateProducto(this.data.id, ProductoCreacion).subscribe({
          next: (reserva) => {
            this.dialogForm.reset();
            this.dialogRef.close();
          },
          error: (err) => {
            console.log(err);
          },
        });
      }else {
        this.productosService.addProducto(ProductoCreacion).subscribe({
          next: (reserva) => {
            this.dialogForm.reset();
            this.dialogRef.close();
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    }else{
        
    }
  }

}
