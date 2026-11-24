import { TestBed } from '@angular/core/testing';

import { MemoryStorage } from '../../testing/memory-storage';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let auth: AuthService;

  beforeEach(() => {
    vi.stubGlobal('localStorage', new MemoryStorage()); // a fresh, empty storage for every test
    auth = TestBed.inject(AuthService);
  });

  it('starts logged out', () => {
    expect(auth.isLoggedIn()).toBe(false);
  });

  it('logs in with "user" and "password"', () => {
    expect(auth.logIn('user', 'password')).toBe(true);
    expect(auth.isLoggedIn()).toBe(true);
  });

  it('does not log in with a wrong username or password', () => {
    expect(auth.logIn('user', 'Password')).toBe(false);
    expect(auth.logIn('admin', 'password')).toBe(false);
    expect(auth.isLoggedIn()).toBe(false);
  });

  it('remembers the login in the browser and can log out', () => {
    auth.logIn('user', 'password');
    expect(localStorage.getItem('packvault-logged-in')).toBe('true');

    auth.logOut();
    expect(auth.isLoggedIn()).toBe(false);
    expect(localStorage.getItem('packvault-logged-in')).toBe('false');
  });
});
