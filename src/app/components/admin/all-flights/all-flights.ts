import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightService } from '../../../services/flight';

@Component({
  selector: 'app-all-flights',
  imports: [CommonModule],
  templateUrl: './all-flights.html',
  styleUrl: './all-flights.css',
})
export class AllFlights {
  flights: any[] = [];
  loading = true;
  error = '';

  constructor(private flightService: FlightService) {}

  ngOnInit(): void {
    this.loadFlights();
  }

  loadFlights() {
    this.flightService.getAllFlights().subscribe({
      next: (data: any) => {
        this.flights = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load flights';
        this.loading = false;
      }
    });
  }
}
