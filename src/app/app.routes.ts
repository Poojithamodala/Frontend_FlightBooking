import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { SearchFlights } from './components/search-flights/search-flights';
import { App } from './app';
import { Profile } from './components/profile/profile';
import { BookFlight } from './components/book-flight/book-flight';
import { AllFlights } from './components/admin/all-flights/all-flights';
import { BookingHistoryComponent } from './components/booking-history/booking-history';
import { AddFlight } from './components/add-flight/add-flight';
import { ChangePassword } from './components/change-password/change-password';

export const routes: Routes = [
  { path: '', component: App },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'profile', component: Profile },
  { path: 'search', component: SearchFlights },
  { path: 'book', component: BookFlight },
  { path: 'admin/all-flights', component: AllFlights },
  { path: 'add-flight', component: AddFlight },
  { path: 'change-password', component: ChangePassword },
  { path: 'booking-history', component: BookingHistoryComponent }

];
