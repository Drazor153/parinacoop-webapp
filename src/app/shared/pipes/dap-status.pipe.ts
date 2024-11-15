import { Pipe, PipeTransform } from '@angular/core';
type DapStatusKeys = {
  [key: string]: string;
};
@Pipe({
  name: 'dapStatus',
  standalone: true,
})
export class DapStatusPipe implements PipeTransform {
  private keys: DapStatusKeys = {
    active: 'Activo',
    'expired-pending': 'Vencido (transferencia pendiente)',
    expired: 'Vencido',
    paid: 'Pagado',
  };

  transform(value: string): string {
    return this.keys[value] ?? 'Formato no válido';
  }
}
