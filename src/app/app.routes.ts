import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { SearchFlights } from './components/search-flights/search-flights';
import { App } from './app';
import { Profile } from './components/profile/profile';
import { BookFlight } from './components/book-flight/book-flight';
import { AllFlights } from './components/admin/all-flights/all-flights';
import { BookingHistory } from './components/booking-history/booking-history';

export const routes: Routes = [
  { path: '', component: App },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  {path: 'profile', component: Profile},
  { path: 'search', component: SearchFlights },
  { path: 'book', component: BookFlight },
  { path: 'admin/all-flights', component: AllFlights },
  { path: 'booking-history', component: BookingHistory }
];
