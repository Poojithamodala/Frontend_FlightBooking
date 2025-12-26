import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';
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
  return this.http.post(
    `${this.apiGateway}/logout`,
    {},
    { responseType: 'text' }
  ).pipe(
    tap(() => localStorage.removeItem('token')),
    catchError(() => {
      // even if backend fails, frontend MUST logout
      localStorage.removeItem('token');
      return [];
    })
  );
}

  getProfile() {
  return this.http.get<User>(`${this.apiGateway}/profile`);
}

  isLoggedIn(): boolean {
  const token = localStorage.getItem('token');
  if (!token) return false;

  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.exp * 1000 > Date.now();
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

shouldForcePasswordChange(): boolean {
  const token = localStorage.getItem('token');
  if (!token) return false;

  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.forcePasswordChange === true;
}

forgotPassword(email: string) {
  return this.http.post(
    `${this.apiGateway}/forgot-password`,
    null,
    { params: { email }, responseType: 'text' }
  );
}

resetPassword(token: string, newPassword: string) {
  return this.http.post(
    `${this.apiGateway}/reset-password`,
    null,
    { params: { token, newPassword }, responseType: 'text' }
  );
}

}