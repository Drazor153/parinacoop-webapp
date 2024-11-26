import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { Region } from './models/Region';
import { User } from '@app/shared/models/user.model';
import { Profile } from '@app/shared/models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private userProfileSubject = new BehaviorSubject<Profile | null>(null);
  public userProfile$ = this.userProfileSubject.asObservable();

  constructor() {}

  getCurrentProfile(): void {
    of({
      run: '12.312.312-3',
      documentNumber: '321.321.321',
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
    })
      .pipe(delay(1000))
      .subscribe({
        next: (profileData) => this.userProfileSubject.next(profileData),
      });
  }

  resetProfile(): void {
    this.userProfileSubject.next(this.userProfileSubject.value);
  }

  updateProfile(data: Profile): void {
    console.log(`Datos cambiados: ${data}`);

    this.userProfileSubject.next(data);
  }

  getRegions(): Observable<Region[]> {
    return of([
      { id: 1, name: 'Arica' },
      { id: 2, name: 'Iquique' },
    ]);
  }
}
