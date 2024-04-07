import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { AuthStatus } from './auth/interface/auth-status.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title: string = 'GestionVentas';
  isAuthenticated: boolean = false;


  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
  }
  
  ngOnInit(): void {
    this.authService.checkStatus();
    if(this.authService.authStatus() === AuthStatus.authenticated){
      this.isAuthenticated = true;
    }
  }

  logout(){
    this.authService.logout();
    this.isAuthenticated = false;
    this.router.navigateByUrl('auth/login');
  }
}
