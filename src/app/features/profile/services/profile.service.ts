import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProfileResponse } from '../interfaces/profile.response';
import { AuthService } from '@app/core/auth/services/auth.service';
import { formatRut, RutFormat } from '@fdograph/rut-utilities';
import { UpdateProfileDto } from '../interfaces/update-profiel.dto';

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
      .get<{profile:ProfileResponse}>(`profile/${this.authService.run}`).pipe(delay(1000))
      .subscribe({
        next: (profileData) => {
          this.userProfileSubject.next(profileData.profile);
        },
      });
  }

  resetProfile(): void {
    this.userProfileSubject.next(this.userProfileSubject.value);
  }

  updateProfile(data: UpdateProfileDto): void {
    console.log(`Datos cambiados:`, data);
    this.httpClient.post<{profile:ProfileResponse}>('profile', data).subscribe({
      next: (newData) => {
        this.userProfileSubject.next(newData.profile);
      },
    });
  }
}
