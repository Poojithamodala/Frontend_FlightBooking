import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

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
          ? { Authorization: `Bearer ${token}` }
          : {}
      }
    ).pipe(
      tap(() => localStorage.removeItem('token'))
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

}