import { ChangeDetectorRef, Component } from '@angular/core';
import { BookingHistoryDTO, BookingService } from '../../services/booking';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-booking-history',
  imports: [CommonModule],
  templateUrl: './booking-history.html',
  styleUrl: './booking-history.css',
})
export class BookingHistoryComponent {
  history: BookingHistoryDTO[] = [];
  loading = true;
  error: string | null = null;

  constructor(private bookingService: BookingService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchHistory();
    this.cdr.detectChanges();
  }

  fetchHistory() {
    this.loading = true;
    this.error = null;

    this.bookingService.getBookingHistory().subscribe({
      next: data => {
        this.history = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        this.error = 'Failed to fetch booking history';
        console.error(err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  cancelBooking(pnr: string) {
    if (!confirm(`Are you sure you want to cancel booking ${pnr}?`)) return;

    this.bookingService.cancelBooking(pnr).subscribe({
      next: () => {
        alert('Booking cancelled successfully!');
        this.fetchHistory(); // refresh list
      },
      error: err => {
        alert('Failed to cancel booking');
        console.error(err);
      }
    });
  }
}
