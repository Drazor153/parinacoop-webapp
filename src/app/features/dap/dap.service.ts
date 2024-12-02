import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { Dap } from './models/dap.model';
import { DapStatus } from './models/dap-status.enum';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@app/core/auth/services/auth.service';

@Injectable({ providedIn: 'root' })
export class DapService {
  private dapsSubject = new BehaviorSubject<Dap[] | null>(null);
  public daps$ = this.dapsSubject.asObservable();

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
  ) {}

  getDapList(): void {
    this.httpClient
      .get<{ daps: Dap[] }>(`clients/${this.authService.run}/daps`)
      .subscribe({
        next: (response) => {
          this.dapsSubject.next(response.daps);
        },
      });
  }

  // getDapById(id: number): Observable<Dap | undefined> {
  //   return of(dapsMock.find((dap) => dap.id === id));
  // }

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
