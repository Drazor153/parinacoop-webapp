import { DapStatus } from "./dap-status.enum";

export class Dap {
  id!: number;
  type!: string;
  currencyType!: string;
  status!: DapStatus;
  days!: number;
  initialDate!: Date;
  initialAmount!: number;
  dueDate!: Date;
  profit!: number;
  interestRate!: number;
}
