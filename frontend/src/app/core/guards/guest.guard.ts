import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const role = authService.getRole();

  const token = localStorage.getItem('authToken');

  // if already logged in go to dashboard
if (token) {
    //  role-based redirect
    if (role === 'Admin') {
      return router.createUrlTree(['//dashboard/admin']);
    }

    if (role === 'Doctor') {
      return router.createUrlTree(['/dashboard/doctor']);
    }

    if (role === 'FDO') {
      return router.createUrlTree(['/dashboard/fdo']);
    }

    // fallback
    return router.createUrlTree(['/dashboard']);
  }

  return true;
};
