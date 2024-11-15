import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./core/layout/auth-layout/auth-layout.component'),
    loadChildren: () => import('./core/auth/auth.routes'),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./core/layout/home-layout/home-layout.component'),
    children: [
      {
        path: 'deposito-a-plazo',
        loadComponent: () => import('./features/dap/dap.component'),
      },
      {
        path: 'perfil',
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
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
