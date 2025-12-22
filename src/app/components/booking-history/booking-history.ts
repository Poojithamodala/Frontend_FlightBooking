import { ChangeDetectorRef, Component } from '@angular/core';
import { BookingService } from '../../services/booking';
import { CommonModule } from '@angular/common';
import { BookingHistoryDTO } from '../../models/BookingHistoryDTO';


@Component({
  selector: 'app-booking-history',
  imports: [CommonModule],
  templateUrl: './booking-history.html',
  styleUrl: './booking-history.css',
})
export class BookingHistory {
  bookings: BookingHistoryDTO[] = [];
  loading = true;
  error = '';

  constructor(private bookingService: BookingService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.bookingService.getBookingHistory().subscribe({
      next: (data) => {
        this.bookings = data;
        this.loading = false;
        this.cdr.detectChanges();
      //   this.bookings = data ?? []; 
      // this.loading = false; 
      },
      error: () => {
        this.error = 'Failed to load booking history';
        this.bookings = [];  
        this.loading = false;
      }
    });
  }

  canCancel(booking: BookingHistoryDTO): boolean {
    if (booking.canceled) return false;

    const departure = new Date(booking.departureTime).getTime();
    const now = new Date().getTime();

    const hoursDiff = (departure - now) / (1000 * 60 * 60);

    return hoursDiff >= 24;
  }

  cancelBooking(pnr: string) {
    if (!confirm('Are you sure you want to cancel this ticket?')) return;

    this.bookingService.cancelBooking(pnr).subscribe({
      next: () => {
        const booking = this.bookings.find(b => b.pnr === pnr);
        if (booking) booking.canceled = true;
      },
      error: () => {
        alert('Failed to cancel booking');
      }
    });
  }
}
