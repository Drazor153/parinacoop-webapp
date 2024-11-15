import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Dap } from './models/dap.model';
import { dapsMock } from './mock/daps';
import { DapStatusEnum } from './models/dap-status.enum';

@Injectable({ providedIn: 'root' })
export class DapService {
  private userDaps: Dap[] | undefined;

  constructor() {}

  getDapList(): Observable<Dap[]> {
    if (this.userDaps) {
      console.log('Returning cached daps');
      return of(this.userDaps);
    }
    return of(dapsMock).pipe(tap((daps) => (this.userDaps = daps)));
  }

  getTotals(dapList: Dap[]): { totalProfit: number; totalActiveDaps: number } {
    return dapList.reduce(
      (previous, current) => {
        if (current.status !== DapStatusEnum.ACTIVE) return previous;
        previous.totalActiveDaps += current.initial_amount;
        previous.totalProfit += current.profit;
        return previous;
      },
      { totalProfit: 0, totalActiveDaps: 0 },
    );
  }
}
