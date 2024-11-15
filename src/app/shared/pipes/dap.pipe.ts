import { Pipe, PipeTransform } from '@angular/core';

type DapKeys = {
  [key: string]: string;
};

@Pipe({
  name: 'dap',
  standalone: true,
})
export class DapPipe implements PipeTransform {
  private keys: DapKeys = {
    active: 'Activo',
    'expired-pending': 'Vencido (transferencia pendiente)',
    'expired': 'Vencido',
    'paid': 'Pagado'
  };

  transform(value: string): string {
    return this.keys[value] ?? 'Formato no válido';
  }
}
