import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { Dap } from './models/dap.model';
import { dapsMock } from './mock/daps';
import { DapStatus } from './models/dap-status.enum';

@Injectable({ providedIn: 'root' })
export class DapService {
  private dapsSubject = new BehaviorSubject<Dap[]>([]);
  public daps$ = this.dapsSubject.asObservable();
  constructor() {}

  getDapList(): Observable<Dap[]> {
    return of(dapsMock).pipe(delay(1000));
  }

  getDapById(id: number): Observable<Dap | undefined> {
    return of(dapsMock.find((dap) => dap.id === id));
  }

  getTotals(dapList: Dap[]): { totalProfit: number; totalActiveDaps: number } {
    return dapList.reduce(
      (previous, current) => {
        if (current.status !== DapStatus.ACTIVE) return previous;
        previous.totalActiveDaps += current.initialAmount;
        previous.totalProfit += current.profit;
        return previous;
      },
      { totalProfit: 0, totalActiveDaps: 0 },
    );
  }
}
