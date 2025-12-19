import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { SearchFlights } from './components/search-flights/search-flights';
import { App } from './app';
import { Profile } from './components/profile/profile';
import { BookFlight } from './components/book-flight/book-flight';

export const routes: Routes = [
  { path: '', component: App },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  {path: 'profile', component: Profile},
  { path: 'search', component: SearchFlights },
  { path: 'book', component: BookFlight }
];
