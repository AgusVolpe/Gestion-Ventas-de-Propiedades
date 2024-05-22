import { Component, OnInit, inject} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { UserRegister } from '../../interface';
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
  hide = true;

  registerForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl('')});

  usuarioCreado!: UserRegister;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, 
                   Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, 
                      Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]],
      role: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getRoles();
  }

  get form(): { [key: string]: AbstractControl }{
    return this.registerForm.controls;
  }

  register() {
    const newUserRegister = this.registerForm.value as UserRegister;

    if(this.isValid(newUserRegister) && !this.form['email'].errors?.['pattern'] && !this.form['password'].errors?.['pattern']){
      this.authService.register(newUserRegister).subscribe({
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
  }

  getRoles(){
    this.authService.getRoles().subscribe(result => {
      this.roles = result;
    })
  }

  isValid(user: UserRegister): boolean{
    return (user.email != '' && user.password != '' && user.role != '');
  }
}
