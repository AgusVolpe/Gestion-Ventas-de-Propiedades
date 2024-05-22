import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from '../../interface/user-login.interface';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  
  private authService = inject(AuthService);
  private router = inject(Router);
  hide = true;

  myForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')});

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: ['', [Validators.required,
                   Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [ Validators.required,
                      Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)
                    ]]
    })
  }

  get form(): { [key: string]: AbstractControl }{
    return this.myForm.controls;
  }

  login() {
    const newUserLogin = this.myForm.value as UserLogin
    if(this.isValid(newUserLogin) && !this.form['email'].errors?.['pattern'] && !this.form['password'].errors?.['pattern']){
      this.authService.login(newUserLogin)
        .subscribe({
          next: res => {
            this.router.navigateByUrl('/')
          },
          error: err => {
            console.log(err);
          }
        })
    }
  }

  isValid(user: UserLogin): boolean{
    return (user.email != '' && user.password != '');
  }
}
