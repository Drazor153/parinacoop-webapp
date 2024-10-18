import { Route } from '@angular/router';

const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@app/core/layout/auth-layout/auth-layout.component'),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component'),
      },
      {
        path: 'register',
        loadComponent: () => import('./pages/register/register.component'),
      },
      {
        path: 'password-recovery',
        loadComponent: () =>
          import('./pages/password-recovery/password-recovery.component'),
      },
    ],
  },
];

export default routes;
