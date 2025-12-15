import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { SearchFlights } from './components/search-flights/search-flights';

export const routes: Routes = [
    // { path: '', component: Login },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'search', component: SearchFlights }
];
