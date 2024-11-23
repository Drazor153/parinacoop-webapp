import { Pipe, PipeTransform } from '@angular/core';
import { DapStatusEnum } from '../models/dap-status.enum';

type DapStatusKeys = {
  [key in DapStatusEnum]: string;
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

  transform(value: DapStatusEnum): string {
    return this.keys[value] ?? value;
  }
}
