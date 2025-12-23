import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  imports: [CommonModule, FormsModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})
export class ChangePassword {
  form = {
    oldPassword: '',
    newPassword: ''
  };

  message = '';
  error = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) { }

  submit() {
    this.message = '';
    this.error = '';

    if (!this.form.oldPassword || !this.form.newPassword) {
      this.error = 'All fields are required';
      return;
    }

    if (this.form.newPassword.length < 6) {
      this.error = 'New password must be at least 6 characters';
      return;
    }

    this.loading = true;

    this.authService.changePassword(this.form).subscribe({
      next: () => {
        this.loading = false;
        this.message = 'Password changed successfully';
        this.form.oldPassword = '';
        this.form.newPassword = '';
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message || err?.error || 'Old password is incorrect';
      }
    });
  }

}
