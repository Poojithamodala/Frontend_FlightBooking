import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlightService } from '../../services/flight';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-flights',
  imports: [FormsModule, CommonModule],
  templateUrl: './search-flights.html',
  styleUrl: './search-flights.css',
})
export class SearchFlights {
   places: string[] = [
    'Hyderabad',
    'Bangalore',
    'Chennai',
    'Delhi',
    'Mumbai',
    'Kolkata',
    'Pune',
    'Ahmedabad'
  ];

  airlines: string[] = [
    'IndiGo',
    'Air India',
    'GoAir',
    'Vistara',
    'Akasa Air',
    'SpiceJet'
  ];
  from = '';
  to = '';
  airline = '';

  flights: any[] = [];
  message = '';

  constructor(private flightService: FlightService, private authService: AuthService,
     private router: Router, private cdr: ChangeDetectorRef) { }

  search() {
    if (!this.from && !this.to && !this.airline) {
      this.message = 'All fields are required';
      this.flights = [];
      this.cdr.detectChanges();
      return;
    }
    if (!this.from || !this.to) {
      this.message = 'From and To locations are required';
      this.flights = [];
      this.cdr.detectChanges();
      return;
    }

    if (!this.airline) {
      this.message = 'Airline name is required';
      this.flights = [];
      this.cdr.detectChanges();
      return;
    }

    this.flightService.search(this.from.toLowerCase(), this.to.toLowerCase(), this.airline.toLowerCase())
      .subscribe({
        next: (data: any[]) => {
          this.flights = data;
          this.cdr.detectChanges();

          if (this.flights.length === 0) {
            this.message = 'No flights available';
            this.cdr.detectChanges();
          } else {
            this.message = '';
          }
        },
        error: () => {
          this.flights = [];
          this.message = 'Error fetching flights';
          this.cdr.detectChanges();
        }
      });
  }

  getDuration(departure: string, arrival: string): string {
    const dep = new Date(departure);
    const arr = new Date(arrival);

    const diffMs = arr.getTime() - dep.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    const hours = Math.floor(diffMins / 60);
    const minutes = diffMins % 60;

    return `${hours}h ${minutes}m`;
  }

  bookFlight(flight: any) {
  if (!this.authService.isLoggedIn()) {
    // alert('Please login to book a flight');
    this.router.navigate(['/login']);
    return;
  }

  localStorage.setItem('selectedFlight', JSON.stringify(flight));
  this.router.navigate(['/book']);
}
}
