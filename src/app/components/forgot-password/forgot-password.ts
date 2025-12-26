import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule, RouterModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  email = '';
  message = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router, private cdr: ChangeDetectorRef) {}

  sendResetLink() {
    if (!this.email.trim()) {
      this.message = 'Email is required';
      return;
    }

    this.loading = true;
    this.authService.forgotPassword(this.email).subscribe({
      next: () => {
        this.loading = false;
        this.message = 'Password reset link sent. Check your email.';
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        this.message = err?.error || 'Something went wrong';
        this.cdr.detectChanges();
      },
    });
  }
}
