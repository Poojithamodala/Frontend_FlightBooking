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
  passengers: any[] = [
    { name: '', age: null, gender: '', seatNumber: '' }
  ];
  message = '';

  constructor(private bookingService: BookingService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.flight = JSON.parse(localStorage.getItem('selectedFlight') || '{}');
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

  book() {
    this.message = '';

    const validationError = this.validateForm();
    if (validationError) {
      this.message = validationError;
      return;
    }

    this.bookingService.book(
      this.flight.id,
      {
        tripType: 'ONE_WAY',
        passengers: this.passengers
      }
    ).subscribe({
      next: (pnr: string) => {
        this.message = 'Booking successful! PNR: ' + pnr;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.message =
          err?.error?.message || 'Booking failed. Please try again.';
      }
    });
  }

  isFormValid(): boolean {
    return this.validateForm() === null;
  }
}
