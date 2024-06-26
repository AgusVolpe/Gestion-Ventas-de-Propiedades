import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';
import { ReservasComponent } from './reservas/reservas.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { redireccionGuard } from './auth/guard/redireccion.guard';
import { isNotAuthenticatedGuard } from './auth/guard/is-not-authenticated.guard';
import { authGuard } from './auth/guard/auth.guard';
import { ReportesComponent } from './reportes/reportes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  {
    path: 'productos',
    canActivate: [authGuard],
    data: { roles: ["Admin", "Vendedor", "Comercial"] },
    component: ProductosComponent
  },
  {
    path: 'reservas',
    canActivate: [authGuard],
    data: { roles: ['Admin', 'Vendedor', 'Comercial'] },
    component: ReservasComponent
  },
  {
    path: 'usuarios',
    canActivate: [authGuard],
    data: { roles: ['Admin'] },
    component: UsuariosComponent
  },
  {
    path: 'reportes',
    canActivate: [authGuard],
    data: { roles: ['Admin', 'Comercial'] },
    component: ReportesComponent
  },
  {
    path: '',
    canActivate: [redireccionGuard],
    component: LoginComponent
  },
  {
    path: 'auth',
    canActivate: [isNotAuthenticatedGuard],
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
