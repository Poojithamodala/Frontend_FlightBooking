import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
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
  passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;


  constructor(private authService: AuthService, private router: Router, private cdr: ChangeDetectorRef) { }

  submit() {
    this.message = '';
    this.error = '';

    const oldPassword = this.form.oldPassword?.trim();
    const newPassword = this.form.newPassword?.trim();

    if (!oldPassword || !newPassword) {
      this.error = 'All fields are required';
      return;
    }

    if (oldPassword === newPassword) {
      this.error = 'New password must be different from old password';
      return;
    }

    if (newPassword.length < 6) {
      this.error = 'Password must be at least 6 characters long';
      return;
    }

    if (!this.passwordRegex.test(newPassword)) {
      this.error =
        'Password must contain uppercase, lowercase, number, and special character';
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
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error || 'Old password is incorrect';
        this.cdr.detectChanges();
      }
    });
  }

}
