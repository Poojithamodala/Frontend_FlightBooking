import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Passenger {
  id: string;
  name: string;
  gender: string;
  age: number;
  seatNumber: string;
  flightId: string | null;
  mealPreference: string | null;
  ticketId: string;
}

export interface BookingHistoryDTO {
  id: string;
  pnr: string;
  tripType: string;
  bookingTime: string;
  seatsBooked: string;
  mealType: string | null;
  totalPrice: number;
  canceled: boolean;
  airline: string;
  fromPlace: string;
  toPlace: string;
  departureTime: string;
  arrivalTime: string;
  passengers: Passenger[];
}

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
      'Authorization': 'Bearer ' + token,
    });

    return this.http.get<BookingHistoryDTO[]>(`${this.apiUrl}/booking/history`, {
      headers,
    });
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
