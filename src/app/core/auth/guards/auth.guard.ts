import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '@app/shared/services';
import { isPlatformServer } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const loaderService = inject(LoaderService);
  const platformId = inject(PLATFORM_ID);
  loaderService.setLoading(true);

  const router = inject(Router);
  
  if (isPlatformServer(platformId)) {
    return false;
  }
  const isAuthenticated = inject(AuthService).isAuthenticated();
  
  if (!isAuthenticated) {
    loaderService.setLoading(false);
    return true;
  }
  loaderService.setLoading(false);
  router.navigate(['/home']);
  return false;
};
