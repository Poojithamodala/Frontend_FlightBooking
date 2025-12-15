import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlightService } from '../../services/flight';

@Component({
  selector: 'app-search-flights',
  imports: [FormsModule, CommonModule],
  templateUrl: './search-flights.html',
  styleUrl: './search-flights.css',
})
export class SearchFlights {
  from = '';
  to = '';
  airline = '';

  flights: any[] = [];
  message = '';

  constructor(private flightService: FlightService) { }

  search() {
    if (!this.from && !this.to && !this.airline) {
      this.message = 'All fields are required';
      this.flights = [];
      return;
    }
    if (!this.from || !this.to) {
      this.message = 'From and To locations are required';
      this.flights = [];
      return;
    }

    if (!this.airline) {
      this.message = 'Airline name is required';
      this.flights = [];
      return;
    }

    this.flightService.search(this.from, this.to, this.airline)
      .subscribe({
        next: (data: any[]) => {
          this.flights = data;

          if (this.flights.length === 0) {
            this.message = 'No flights available';
          } else {
            this.message = '';
          }
        },
        error: () => {
          this.flights = [];
          this.message = 'Error fetching flights';
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
}
