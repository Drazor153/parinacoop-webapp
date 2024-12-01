import { DapStatus } from '../models/dap-status.enum';
import { Dap } from '../models/dap.model';

export const dapsMock: Dap[] = [
  {
    id: 123456789,
    type: 'Renovable',
    currencyType: 'CLP',
    status: DapStatus.ACTIVE,
    days: 30,
    initialDate: new Date('2024-09-31'),
    initialAmount: 500000,
    dueDate: new Date('2024-10-31'),
    profit: 2000,
    interestRate: 0.004,
  },
  {
    id: 123456780,
    type: 'Fijo',
    currencyType: 'CLP',
    status: DapStatus.EXPIRED_PENDING,
    days: 60,
    initialDate: new Date('2024-08-21'),
    initialAmount: 1000000,
    dueDate: new Date('2024-10-21'),
    profit: 4000,
    interestRate: 0.0045,
  },
  {
    id: 123436779,
    type: 'Fijo',
    currencyType: 'CLP',
    status:DapStatus.PAID,
    days: 30,
    initialDate: new Date('2024-09-20'),
    initialAmount: 250000,
    dueDate: new Date('2024-10-20'),
    profit: 1000,
    interestRate: 0.0043,
  }
];
