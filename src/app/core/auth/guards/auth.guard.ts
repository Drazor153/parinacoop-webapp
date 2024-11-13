import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '@app/shared/services';

export const authGuard: CanActivateFn = (route, state) => {
  const loaderService = inject(LoaderService)
  loaderService.setLoading(true);

  const router = inject(Router);
  const isAuthenticated = inject(AuthService).isAuthenticated();


  if (!isAuthenticated) {
    loaderService.setLoading(false);
    return true;
  }
  loaderService.setLoading(false);
  router.navigate(['/home']);
  return false;
};
