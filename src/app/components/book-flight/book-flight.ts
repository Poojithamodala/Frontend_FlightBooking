import { ChangeDetectorRef, Component } from '@angular/core';
import { BookingService } from '../../services/booking';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-flight',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-flight.html',
  styleUrl: './book-flight.css',
})
export class BookFlight {
  flight: any;
  // passengers: any[] = [
  //   { name: '', age: null, gender: '', seatNumber: '' }
  // ];
  passengers: any[] = [];
  message = '';
  successMessage = '';
  errorMessage = '';
  pnr = '';

  constructor(private bookingService: BookingService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.flight = JSON.parse(localStorage.getItem('selectedFlight') || '{}');
    this.addPassenger();
  }

  addPassenger() {
    this.passengers.push({ name: '', age: null, gender: '', seatNumber: '' });
  }

  removePassenger(index: number) {
    if (this.passengers.length > 1) {
      this.passengers.splice(index, 1);
    }
  }

  validateForm(): string | null {
    const seatSet = new Set<string>();

    for (let i = 0; i < this.passengers.length; i++) {
      const p = this.passengers[i];

      if (!p.name || !p.gender || !p.seatNumber || !p.age || p.age <= 0) {
        return `Please fill all details for Passenger ${i + 1}`;
      }

      const seat = p.seatNumber.trim().toUpperCase();

      if (seatSet.has(seat)) {
        return `Seat ${seat} is selected more than once`;
      }

      seatSet.add(seat);
    }

    return null;
  }

  getSeatError(index: number): string | null {
    const currentSeat = this.passengers[index].seatNumber;
    if (!currentSeat) return null;

    const trimSeat = currentSeat.trim().toUpperCase();

    for (let i = 0; i < this.passengers.length; i++) {
      if (i !== index) {
        const otherSeat = this.passengers[i].seatNumber;
        // ?.trim()
        // .toUpperCase();

        if (otherSeat === trimSeat) {
          return `Seat ${trimSeat} is already selected`;
        }
      }
    }
    return null;
  }

  isLoading = false;
  book() {
  this.errorMessage = '';
  this.successMessage = '';

  if (this.isLoading) return;
  this.isLoading = true;

  const validationError = this.validateForm();
  if (validationError) {
    this.errorMessage = validationError;
    this.isLoading = false;
    return;
  }

  this.bookingService.book(
    this.flight.id,
    {
      tripType: 'ONE_WAY',
      returnFlightId: null,
      passengers: this.passengers
    }
  ).subscribe({
    next: (pnr: string) => {
      this.pnr = pnr;
      this.successMessage = 'Booking successful';
      this.isLoading = false;
      this.cdr.detectChanges();
    },
    error: (err) => {
  if (typeof err.error === 'string') {
    try {
      const parsed = JSON.parse(err.error);
      this.errorMessage = parsed.message || 'Booking failed';
    } catch {
      this.errorMessage = err.error;
    }
  } else if (err.error?.message) {
    this.errorMessage = err.error.message;
  } else {
    this.errorMessage = 'Booking failed';
  }

  this.isLoading = false;
  this.cdr.detectChanges();
}
  });
}

  isFormValid(): boolean {
    return this.validateForm() === null;
  }
}
