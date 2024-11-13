import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '@env/environment';
import { LoginResponse } from '../pages/login/interfaces/login.response';
import { User } from '../../../shared/models/user.model';
import { JwtService } from './jwt.service';
import { LoaderService } from '@app/shared/services';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  public currentUser = this.currentUserSubject.asObservable();
  private accessToken: string = '';

  constructor(private readonly jwtService: JwtService) {}

  saveAccessToken(token: string): void {
    this.accessToken = token;
    localStorage.setItem('access_token', token);
  }

  getAccessToken(): string {
    return this.accessToken;
  }

  isAuthenticated(): boolean {
    return !!this.jwtService.getToken();
  }

  logout(): void {
    this.jwtService.destroyToken();
  }
}
