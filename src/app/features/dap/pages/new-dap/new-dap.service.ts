import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { TermOption } from './models/TermOption';

@Injectable({
  providedIn: 'root',
})
export class NewDapService {
  constructor(private httpClient: HttpClient) {}

  getTermOptions(
    type: string,
    initialAmount: number,
  ): Observable<TermOption[]> {
    console.log(initialAmount);

    // TODO Tasa de interes en base a dias y algo más, debe hacerse en el servidor
    const terms = [30, 60, 90, 120, 150, 365];
    const interestRate = 0.004533;

    return of<TermOption[]>(
      terms.map((term) => {
        const finalAmount = Math.floor(
          initialAmount * (1 + interestRate * (term / 30)),
        );
        return {
          days: term,
          dueDate: new Date(Date.now() + term * 1000 * 60 * 60 * 24),
          interestRate,
          profit: finalAmount - initialAmount,
          finalAmount,
        };
      }),
    );
    // .pipe(delay(1000));
  }
}
