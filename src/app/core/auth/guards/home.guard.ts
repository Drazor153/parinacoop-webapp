import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '@app/shared/services';

export const homeGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loaderService = inject(LoaderService);
  loaderService.setLoading(true);
  const isAuthenticated = inject(AuthService).isAuthenticated();

  if (isAuthenticated) {
    loaderService.setLoading(false);
    return true;
  }
  router.navigate(['/login']);
    loaderService.setLoading(false);
    return false;
};
