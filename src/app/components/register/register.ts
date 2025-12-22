import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  user = {
    username: '',
    email: '',
    password: '',
    role: '',
    age: null as number | null,
    gender: ''
  };
  message = '';
  success = false;

  constructor(private authService: AuthService, private router: Router, private cdr: ChangeDetectorRef) { }

  selectRole(role: 'USER'|'ADMIN'){
    this.user.role=role;
  }

  register() {
    console.log('Register method triggered');
    this.success = false;
    const { username, email, password, role, age, gender } = this.user;
    const u = username?.trim();
    const e = email?.trim();
    const p = password?.trim();
    const g = gender?.trim();
    if (!u || !e || !p || age === null || !g) {
      this.message = 'All fields are required';
      this.success = false;
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(e)) {
      this.message = 'Enter a valid email address';
      return;
    }

    if (u.length < 3) {
      this.message = 'Username must be at least 3 characters';
      return;
    }

    if (p.length < 6) {
      this.message = 'Password must be at least 6 characters';
      this.success = false;
      return;
    }

    if (age <= 0 || age > 120) {
      this.message = 'Enter a valid age';
      return;
    }

    this.authService.register(this.user).subscribe({
      next: () => {
        this.success = true;
        this.message = 'Registration successful. Please login.';
        setTimeout(() => this.router.navigate(['login']), 1500);
      },
      error: (err) => {
        this.message = err?.error || 'Email already exists';
      }
    });
  }
}
