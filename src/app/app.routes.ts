import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

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
    loadComponent: () => import('./core/layout/home-layout/home-layout.component'),
  }
];
