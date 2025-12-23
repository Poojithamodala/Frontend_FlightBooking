import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiGateway = 'http://localhost:8765/user-service/auth';

  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post<{ token: string }>(
      `${this.apiGateway}/login`,
      data
    ).pipe(
      tap(res => {
        if (res?.token) {
          localStorage.setItem('token', res.token);
        }
      })
    );
  }

  register(data: any) {
    return this.http.post(
      `${this.apiGateway}/register`,
      data,
      { responseType: 'text' }
    );
  }

  logout() {
    const token = localStorage.getItem('token');

    return this.http.post(
      `${this.apiGateway}/logout`,
      {},
      {
        headers: token
          ? { Authorization: `Bearer ${token}` } : {},
          responseType: 'text'
      }
    ).pipe(
      tap(() => localStorage.removeItem('token'))
    );
  }

  getProfile() {
    const token = localStorage.getItem('token');

    return this.http.get<User>(`${this.apiGateway}/profile`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

   getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.roles?.[0] || null;   // ADMIN / USER
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
  }

  changePassword(data: { oldPassword: string; newPassword: string }) {
  const token = localStorage.getItem('token');

  return this.http.put(
    `${this.apiGateway}/changepassword`,
    data,
    {
      headers: token
        ? { Authorization: `Bearer ${token}` }: {},
        responseType: 'text'
    }
  );
}

}