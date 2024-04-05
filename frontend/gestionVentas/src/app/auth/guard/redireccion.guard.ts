import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { inject } from '@angular/core';

export const redireccionGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const currentRol = authService.currentUser()?.role;

  switch(currentRol){
    case 'Vendedor':{
      router.navigateByUrl('/productos');
      return true;
    }
    case 'Admin':{
      router.navigateByUrl('/reportes');
      return true;
    }
    case 'Comercial':{
      router.navigateByUrl('/reservas');
      return true;
    }
    default: {
      router.navigateByUrl('/auth/login');
      break;
    }
  }

  return true;
};
