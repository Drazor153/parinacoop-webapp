import { Routes } from '@angular/router';
import { inject } from '@angular/core';

import { ROUTE_TOKENS } from './route-tokens';
import { AuthService } from './core/auth/services/auth.service';

export const routes: Routes = [
  {
    path: ROUTE_TOKENS.AUTH_PATH,
    canMatch: [() => !inject(AuthService).isAuthenticated()],
    loadComponent: () =>
      import('./core/layout/auth-layout/auth-layout.component'),
    loadChildren: () => import('./core/auth/auth.routes'),
  },
  {
    path: ROUTE_TOKENS.CLIENT_PATH,
    canActivate: [() => inject(AuthService).isAuthenticated()],
    canMatch: [() => inject(AuthService).isAuthenticated()],
    loadComponent: () =>
      import('./core/layout/home-layout/home-layout.component'),
    children: [
      {
        path: '',
        redirectTo: ROUTE_TOKENS.CLIENT_HOME,
        pathMatch: 'full',
      },
      {
        path: ROUTE_TOKENS.CLIENT_HOME,
        loadComponent: () => import('./features/home/home.component'),
      },
      {
        path: ROUTE_TOKENS.DAP,
        loadChildren: () => import('./features/dap/dap.routes'),
      },
      {
        path: ROUTE_TOKENS.PROFILE,
        loadComponent: () => import('./features/profile/profile.component'),
      },
      {
        path: 'cuentas-de-ahorro',
        loadComponent: () =>
          import('./features/cuenta-ahorro/cuenta-ahorro.component'),
      },
      {
        path: 'creditos-de-consumo',
        loadComponent: () =>
          import('./features/credito-consumo/credito-consumo.component'),
      },
      {
        path: 'creditos-comerciales',
        loadComponent: () =>
          import('./features/credito-comercial/credito-comercial.component'),
      },
    ],
  },
  {
    path: '**',
    redirectTo: ROUTE_TOKENS.AUTH_PATH,
  },
];
