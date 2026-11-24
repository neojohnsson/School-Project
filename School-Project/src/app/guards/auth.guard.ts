import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * A "guard" runs BEFORE Angular opens a page and decides if you may go there.
 * Logged in → open the page. Not logged in → go to the login page instead.
 *
 * It is added to a page in app.routes.ts with:  canActivate: [authGuard]
 */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isLoggedIn() ? true : router.createUrlTree(['/login']);
};
