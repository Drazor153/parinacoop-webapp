import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Dap } from './dap.model';
import { dapsMock } from './mock/daps';

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
}
