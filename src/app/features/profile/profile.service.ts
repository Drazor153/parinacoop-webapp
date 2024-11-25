import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { Region } from './models/Region';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor() {}

  getRegions(): Observable<Region[]> {
    return of([
      { id: 1, name: 'Arica' },
      { id: 2, name: 'Iquique' },
    ]).pipe(delay(1000));
  }
}
