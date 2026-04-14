import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRole = route.data['role'];

  if (authService.isLoggedIn$ && authService.hasRole(expectedRole)) {
    return true;
  } else {
    router.navigate(['/signin']);
    return false;
  }
};
