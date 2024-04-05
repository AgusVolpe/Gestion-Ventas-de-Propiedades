import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interface/auth-status.enum';

export const authGuard: CanActivateFn = (route, state) => {


  const authService = inject(AuthService);
  const router = inject(Router);

  const currentRol = authService.currentUser()?.role

  const roles = route.data['roles'];

  if (authService.authStatus() === AuthStatus.authenticated) {
    if(roles.includes(currentRol)){
      return true
    }else{
      router.navigateByUrl('/')
    }
  }else{
    router.navigateByUrl('/auth/login')
  }

  return false;
};
