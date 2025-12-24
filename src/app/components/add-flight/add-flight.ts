import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
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

  minDateTime!: string;

ngOnInit() {
  this.setMinDateTime();
}

setMinDateTime() {
  const now = new Date();
  now.setSeconds(0, 0); // remove seconds & milliseconds
  this.minDateTime = now.toISOString().slice(0, 16);
}

  constructor(private flightService: FlightService, private cdr: ChangeDetectorRef) { }

  addFlight(flightForm: any) {
    if (this.loading) return;

    this.loading = true;
    this.message = '';

    if (this.flight.fromPlace.trim().toLowerCase() ===
      this.flight.toPlace.trim().toLowerCase()) {
      this.message = 'From and To locations cannot be the same';
      this.loading = false;  
      return;
    }

    const departure = new Date(this.flight.departureTime);
    const arrival = new Date(this.flight.arrivalTime);
    const now = new Date();

    if (departure <= now) {
      this.message = 'Departure time must be in the future';
      this.loading = false;  
      return;
    }

    if (arrival <= departure) {
      this.message = 'Arrival time must be after departure time';
      this.loading = false;  
      return;
    }

    if (this.flight.price === null || this.flight.price <= 0) {
      this.message = 'Price must be greater than zero';
      this.loading = false;  
      return;
    }

    if (this.flight.price > 100000) {
      this.message = 'Price is too high';
      this.loading = false;  
      return;
    }

    if (this.flight.totalSeats === null || this.flight.totalSeats <= 0) {
      this.message = 'Total seats must be greater than zero';
      this.loading = false;  
      return;
    }

    if (this.flight.totalSeats > 500) {
      this.message = 'Total seats cannot exceed 500';
      this.loading = false;  
      return;
    }


    const payload = {
      ...this.flight,
      departureTime: this.flight.departureTime + ':00',
      arrivalTime: this.flight.arrivalTime + ':00',
      availableSeats: this.flight.totalSeats
    };

    this.flightService.addFlight(payload).subscribe({
      next: (res) => {
        this.message = res.message || 'Flight added successfully';
        flightForm.resetForm();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.message = err.error?.message || 'Failed to add flight';
        this.loading = false;
        this.cdr.detectChanges();
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
