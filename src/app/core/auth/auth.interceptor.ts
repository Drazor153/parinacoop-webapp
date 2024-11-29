import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { environment } from '@env/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).getAccessToken();

  const url = `${environment.apiUrl}/${req.url}`;

  const request = req.clone({
    url,
    setHeaders: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  return next(request);
};
