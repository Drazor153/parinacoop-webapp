import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from './interfaces/login.response';
import { environment } from '@env/environment';
import { AuthService } from '../../services/auth.service';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService,
  ) {}

  login(credentials: {
    run: number;
    password: string;
  }): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(`${environment.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(({ accessToken }) => {
          this.authService.saveAccessToken(accessToken);
        }),
      );
  }
}
