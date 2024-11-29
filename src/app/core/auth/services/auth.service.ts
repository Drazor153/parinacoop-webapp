import { Injectable } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { JwtService } from './jwt.service';
import { LoaderService } from '@app/shared/services';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: User | null = null;
  private accessToken: string = '';

  get run(): number {
    return this.currentUser?.run || 0;
  }

  constructor(private readonly jwtService: JwtService) {
    this.accessToken = localStorage.getItem('access_token') || '';
    if (this.accessToken) {
      this.currentUser = jwtDecode<User>(this.accessToken);
    }
  }

  saveAccessToken(token: string): void {
    this.accessToken = token;
    this.currentUser = jwtDecode<User>(token);
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
    this.currentUser = null;
  }
}
