import { Routes } from '@angular/router';
import { ROUTE_TOKENS } from '@app/route-tokens';

const homeRoutes: Routes = [
  {
    path: '',
    redirectTo: ROUTE_TOKENS.CLIENT_HOME,
    pathMatch: 'full',
  },
  {
    path: ROUTE_TOKENS.CLIENT_HOME,
    loadComponent: () => import('@features/home/home.component'),
  },
  {
    path: ROUTE_TOKENS.DAP,
    loadChildren: () => import('@features/dap/dap.routes'),
  },
  {
    path: ROUTE_TOKENS.PROFILE,
    loadComponent: () => import('@features/profile/profile.component'),
  },
  {
    path: 'cuentas-de-ahorro',
    loadComponent: () =>
      import('@features/cuenta-ahorro/cuenta-ahorro.component'),
  },
  {
    path: 'creditos-de-consumo',
    loadComponent: () =>
      import('@features/credito-consumo/credito-consumo.component'),
  },
  {
    path: 'creditos-comerciales',
    loadComponent: () =>
      import('@features/credito-comercial/credito-comercial.component'),
  },
];

export default homeRoutes;
