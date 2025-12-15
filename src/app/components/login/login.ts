import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  credentials = { email: '', password: '' };
  message = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.message = '';

    const email = this.credentials.email?.trim();
    const password = this.credentials.password?.trim();

    if (!email || !password) {
      this.message = 'All fields are required';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.message = 'Please enter a valid email address';
      return;
    }

    if (password.length < 6) {
      this.message = 'Password must be at least 6 characters';
      return;
    }

    if (this.loading) {
      return;
    }

    this.loading = true;

    this.authService.login({ email, password }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/search']);
      },
      error: (err) => {
        this.loading = false;
        this.message = err?.error || 'Invalid email or password';
      }
    });
  }
}
