import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingHistoryDTO } from '../models/BookingHistoryDTO';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiUrl = 'http://localhost:8765/booking-service/api/flight';
  
  constructor(private http: HttpClient) { }

  book(flightId: string, body: any): Observable<string> {
    const token = localStorage.getItem('token'); 

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.post(`${this.apiUrl}/booking/${flightId}`, body, { headers, responseType: 'text' });
  }

  getBookingHistory(): Observable<BookingHistoryDTO[]> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<BookingHistoryDTO[]>(
      `${this.apiUrl}/booking/history`,
      { headers }
    );
  }

  cancelBooking(pnr: string) {
  const token = localStorage.getItem('token');

  return this.http.put(
    `${this.apiUrl}/booking/cancel/${pnr}`,
    {},
    {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  );
}

}
