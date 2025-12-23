import { ChangeDetectorRef, Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(private authService: AuthService, private router: Router, private cdr: ChangeDetectorRef) { 
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

logout() {
  this.authService.logout().subscribe({
    next: () => {
      alert('Logged out successfully!');
      this.router.navigate(['/login']); // redirect to login page
    },
    error: () => {
      alert('Error logging out, please try again.');
    }
  });
}
}
