import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private apiUrl = 'http://localhost:8765/flight-service/api/flight';

  constructor(private http: HttpClient) { }

  search(from: string, to: string, airline: string) {
    return this.http.post<any[]>(
      `${this.apiUrl}/search/airline`,
      {
        fromPlace: from,
        toPlace: to,
        airline: airline
      }
    );
  }
}
