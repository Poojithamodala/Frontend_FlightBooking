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
  // isHome=false;
  constructor(private authService: AuthService, private router: Router, private cdr: ChangeDetectorRef) { 
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     this.isHome = this.router.url === '/' || this.router.url === '';
    //     this.cdr.detectChanges();
    //   }
    // });
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
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
