import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlightService } from '../../services/flight';

@Component({
  selector: 'app-add-flight',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-flight.html',
  styleUrl: './add-flight.css',
})
export class AddFlight {

  flight = {
    airline: '',
    fromPlace: '',
    toPlace: '',
    departureTime: '',
    arrivalTime: '',
    price: null,
    totalSeats: null,
    availableSeats: null
  };

  message = '';
  loading = false;

  constructor(private flightService: FlightService) {}

  addFlight() {
  if (this.loading) return;

  this.loading = true;
  this.message = '';

  const payload = {
    ...this.flight,
    departureTime: this.flight.departureTime + ':00',
    arrivalTime: this.flight.arrivalTime + ':00',
    availableSeats: this.flight.totalSeats
  };

  this.flightService.addFlight(payload).subscribe({
    next: (res) => {
      this.message = res.message || 'Flight added successfully';

      // ✅ RESET FORM
      this.flight = {
        airline: '',
        fromPlace: '',
        toPlace: '',
        departureTime: '',
        arrivalTime: '',
        price: null,
        totalSeats: null,
        availableSeats: null
      };

      // ✅ STOP LOADING
      this.loading = false;
    },
    error: (err) => {
      this.message = err.error?.message || 'Failed to add flight';
      this.loading = false;
    }
  });
}


  resetForm() {
    this.flight = {
      airline: '',
      fromPlace: '',
      toPlace: '',
      departureTime: '',
      arrivalTime: '',
      price: null,
      totalSeats: null,
      availableSeats: null
    };
  }

}
