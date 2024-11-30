import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProfileResponse } from '../interfaces/profile.response';
import { AuthService } from '@app/core/auth/services/auth.service';
import { UpdateProfileDto } from '../interfaces/update-profile.dto';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private userProfileSubject = new BehaviorSubject<ProfileResponse | null>(
    null,
  );
  public userProfile$ = this.userProfileSubject.asObservable();

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
  ) {}

  getCurrentProfile(): void {
    if (this.userProfileSubject.value) return;
    this.httpClient
      .get<{ profile: ProfileResponse }>(`profile/${this.authService.run}`)
      .subscribe({
        next: (profileData) => {
          this.userProfileSubject.next(profileData.profile);
        },
      });
  }

  resetProfile(): void {
    this.userProfileSubject.next(this.userProfileSubject.value);
  }

  updateProfile(data: UpdateProfileDto): Observable<{ msg: string }> {
    console.log(`Datos cambiados:`, data);
    return this.httpClient
      .patch<{ msg: string }>(`profile/${data.run}`, data)
      .pipe(tap({ next: () => this.userProfileSubject.next(data) }));
  }
}
