import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuariosService } from '../usuarios.service';
import { RolUsuario } from '../interface/rol-usuario.interface';

@Component({
  selector: 'app-modal-usuarios',
  templateUrl: './modal-usuarios.component.html',
  styleUrl: './modal-usuarios.component.css'
})
export class ModalUsuariosComponent implements OnInit{
  
  dialogForm!: FormGroup;
  roles: any[] = [];
  nuevoRol!: string;
  userId!: string;

  private usuariosService = inject(UsuariosService);

  constructor(
    public dialogRef: MatDialogRef<ModalUsuariosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) {
      this.dialogForm = this.fb.group({
        newRole: ['', Validators.required],
      });
      this.userId = this.data.user.id;
  }


  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(){
    this.usuariosService.getRoles().subscribe(result => {
      this.roles = result;
      let userRoles = this.data.user.roles;
      this.roles = this.roles.filter(rol => !userRoles.some((userRole: RolUsuario) => userRole.id === rol.id));
    });
  }

  agregarRol(){
    if(this.data.user.id != null && this.data.user.id != ''){
      this.usuariosService.addNewRoleToUser(this.data.user.id,this.nuevoRol).subscribe({
        next: (rol) => {
          this.dialogForm.reset();
          this.nuevoRol = '';
          this.userId = '';
          this.dialogRef.close();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
