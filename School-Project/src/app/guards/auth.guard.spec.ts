import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
  provideRouter,
} from '@angular/router';

import { MemoryStorage } from '../../testing/memory-storage';
import { AuthService } from '../services/auth.service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', new MemoryStorage()); // start logged out
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
  });

  /** Runs the guard like Angular does when you try to open a page. */
  const runGuard = () =>
    TestBed.runInInjectionContext(() =>
      authGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot),
    );

  it('sends you to the login page when you are logged out', () => {
    const result = runGuard();
    const router = TestBed.inject(Router);
    expect(router.serializeUrl(result as UrlTree)).toBe('/login');
  });

  it('lets you in when you are logged in', () => {
    TestBed.inject(AuthService).logIn('ash', 'PasSword123!');
    expect(runGuard()).toBe(true);
  });
});
