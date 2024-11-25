import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { Region } from './models/Region';
import { User } from '@app/shared/models/user.model';
import { Profile } from '@app/shared/models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor() {}

  getUser(): Observable<Profile> {
    return of({
      run: '12.312.312-3',
      names: 'A',
      firstLastName: 'A',
      secondLastName: 'A',
      email: 'a@a.com',
      cellphone: '+5623',
      street: 'lobos',
      number: '123',
      detail: 'al lado',
      regionId: 1,
      communeId: 1,
    }).pipe(delay(1000));
  }

  getRegions(): Observable<Region[]> {
    return of([
      { id: 1, name: 'Arica' },
      { id: 2, name: 'Iquique' },
    ]);
  }
}
