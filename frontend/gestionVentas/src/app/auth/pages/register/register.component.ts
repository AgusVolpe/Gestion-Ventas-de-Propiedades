import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { UserRegister } from '../../interface';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit{
  private authService = inject(AuthService);
  private router = inject(Router);

  selectedValue!: string;
  selectedCar!: string;
  roles: any[] = [];

  registerForm!: FormGroup;
  usuarioCreado!: UserRegister;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getRoles();
  }

  register() {
    const { email, password, role } = this.registerForm.value;

    // const user = this.registerForm.value as UserRegister

    const newUser: UserRegister = {
      email: email,
      password: password,
      role: role,
    };

    this.authService.register(newUser).subscribe({
      next: (userCreado) => {
        this.usuarioCreado = userCreado;
        this.registerForm.reset();
        this.router.navigateByUrl('auth/login')
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getRoles(){
    this.authService.getRoles().subscribe(result => {
      this.roles = result;
      console.log('Result de roles es: ', this.roles);
    })
  }
}
