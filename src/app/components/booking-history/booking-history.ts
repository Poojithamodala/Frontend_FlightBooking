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
  cancellingPnr: string | null = null;
  successMessage = '';
  errorMessage = '';
  showModal = false;
  modalMessage = '';

  openModal(message: string) {
    this.modalMessage = message;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  constructor(private bookingService: BookingService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.fetchHistory();
    this.cdr.detectChanges();
  }

  fetchHistory() {
    this.loading = true;
    this.error = null;

    this.bookingService.getBookingHistory().subscribe({
      next: data => {
        // this.history = data;
        this.history = data.sort((a, b) => Number(a.canceled) - Number(b.canceled));
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
    next: (res: any) => {
      this.openModal(res || 'Booking cancelled successfully!');
      this.fetchHistory();
      this.cdr.detectChanges();
    },
    error: err => {
      let msg = 'Failed to cancel booking';

      if (typeof err.error === 'string') {
        try {
          const parsed = JSON.parse(err.error);
          msg = parsed.message || msg;
        } catch {
          msg = err.error;
        }
      } else if (err?.error?.message) {
        msg = err.error.message;
      }

      this.openModal(msg);
      this.cdr.detectChanges();
    }
  });
}
}
