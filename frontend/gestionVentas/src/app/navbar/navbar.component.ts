import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  title: string = 'GestionVentas';
  isLoggedIn: boolean = false;


  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
  }
  
  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
    });
  }

  logout(){
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('auth/login');
  }

  redirectReservas(){
    this.router.navigateByUrl('reservas');
  }
  
  redirectProductos(){
    this.router.navigateByUrl('productos');
  }

  redirectReportes(){
    this.router.navigateByUrl('reportes');
  }

  redirectUsuarios(){
    this.router.navigateByUrl('usuarios');
  }

  getRole(){
    return this.authService.getRoleUsuario();
  }
}
