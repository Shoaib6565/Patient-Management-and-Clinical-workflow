import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service.service';
import { map, take } from 'rxjs/operators';

export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRole = route.data['role'];

  return authService.isLoggedIn$.pipe(
    take(1),
    map((isLoggedIn: boolean) => {
      const role = localStorage.getItem('role');

      if (isLoggedIn && role === expectedRole) {
        return true;
      }

      router.navigate(['/signin']);
      return false;
    }),
  );
};
