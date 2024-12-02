import { Routes } from '@angular/router';
import { inject } from '@angular/core';

import { ROUTE_TOKENS } from './route-tokens';
import { AuthService } from './core/auth/services/auth.service';
import { adminGuard } from '@layout/admin-layout/guards/admin.guard';
import { homeGuard } from '@layout/home-layout/guards/home.guard';

export const routes: Routes = [
  {
    path: ROUTE_TOKENS.AUTH_PATH,
    canMatch: [() => !inject(AuthService).isAuthenticated()],
    loadComponent: () => import('@layout/auth-layout/auth-layout.component'),
    loadChildren: () => import('./core/auth/auth.routes'),
  },
  {
    path: ROUTE_TOKENS.CLIENT_PATH,
    canActivate: [homeGuard],
    canMatch: [homeGuard],
    loadComponent: () => import('@layout/home-layout/home-layout.component'),
    loadChildren: () => import('@layout/home-layout/home.routes'),
  },
  {
    path: ROUTE_TOKENS.ADMIN_PATH,
    canMatch: [adminGuard],
    canActivate: [adminGuard],
    loadComponent: () => import('@layout/admin-layout/admin-layout.component'),
    loadChildren: () => import('@layout/admin-layout/admin.routes'),
  },
  {
    path: '**',
    redirectTo: ROUTE_TOKENS.AUTH_PATH,
  },
];
