import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interface/auth-status.enum';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {


  console.log('IsNotAuthenticated Guard');


  const authService = inject(AuthService);
  const router = inject(Router);



  if (authService.authStatus() === AuthStatus.authenticated) {
    router.navigateByUrl('/');
    return false;
  }

  return true;
};
