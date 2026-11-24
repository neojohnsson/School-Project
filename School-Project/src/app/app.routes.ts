import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { OpenPacks } from './pages/open-packs/open-packs';
import { Login } from './pages/login/login';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomePage },
    { path: 'open-packs', component: OpenPacks },
    { path: 'login', component: Login }
];
