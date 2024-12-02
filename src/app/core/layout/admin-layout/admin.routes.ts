import { Routes } from '@angular/router';
import { ROUTE_TOKENS } from '@app/route-tokens';

const adminRoutes: Routes = [
  {
    path: '',
    redirectTo: ROUTE_TOKENS.ADMIN_HOME,
    pathMatch: 'full',
  },
  {
    path: ROUTE_TOKENS.ADMIN_CLIENTS,
    loadComponent: () => import('@features/admin/clients/clients.component'),
  }
];

export default adminRoutes;
