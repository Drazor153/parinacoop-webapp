import { DapStatusEnum } from "./dap-status.enum";

export class Dap {
  id!: number;
  type!: string;
  currency_type!: string;
  status!: DapStatusEnum;
  days!: number;
  initial_date!: Date;
  initial_amount!: number;
  due_date!: Date;
  final_amount!: number;
  profit!: number;
  interest_rate!: number;
}
