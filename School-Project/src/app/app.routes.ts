import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { OpenPacks } from './pages/open-packs/open-packs';
import { Login } from './pages/login/login';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomePage },
    // canActivate: you must be logged in to open packs (otherwise you go to /login)
    { path: 'open-packs', component: OpenPacks, canActivate: [authGuard] },
    { path: 'login', component: Login }
];
