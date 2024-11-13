import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth.guard';
import { homeGuard } from './core/auth/guards/home.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./core/layout/auth-layout/auth-layout.component'),
    canActivate: [authGuard],
    loadChildren: () => import('./core/auth/auth.routes'),
  },
  {
    path: 'home',
    canActivate: [homeGuard],
    loadComponent: () =>
      import('./core/layout/home-layout/home-layout.component'),
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
