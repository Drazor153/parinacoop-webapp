import { Dap } from '../dap.model';

export const dapsMock: Dap[] = [
  {
    id: 123456789,
    type: 'Renovable',
    currency_type: 'CLP',
    status: 'Activo',
    days: 30,
    initial_date: new Date('2024-09-31'),
    initial_amount: 500000,
    due_date: new Date('2024-10-31'),
    final_amount: 502000,
    profit: 2000,
    interest_rate: 0.004,
  },
  {
    id: 123456780,
    type: 'Fijo',
    currency_type: 'CLP',
    status: 'Vencido (transferencia pendiente)',
    days: 60,
    initial_date: new Date('2024-08-21'),
    initial_amount: 1000000,
    due_date: new Date('2024-10-21'),
    final_amount: 1004000,
    profit: 4000,
    interest_rate: 0.0045,
  },
  {
    id: 123436779,
    type: 'Fijo',
    currency_type: 'CLP',
    status: 'Pagado',
    days: 30,
    initial_date: new Date('2024-09-20'),
    initial_amount: 250000,
    due_date: new Date('2024-10-20'),
    final_amount: 251000,
    profit: 1000,
    interest_rate: 0.0043,
  }
];
