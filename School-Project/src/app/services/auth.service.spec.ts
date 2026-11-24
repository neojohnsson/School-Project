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

  it('logs in with any username and a valid password', () => {
    expect(auth.logIn('ash', 'PasSword123!')).toBe(true);
    expect(auth.isLoggedIn()).toBe(true);
  });

  it('does not log in with an invalid password or no username', () => {
    expect(auth.logIn('ash', 'password')).toBe(false);
    expect(auth.logIn('   ', 'PasSword123!')).toBe(false);
    expect(auth.isLoggedIn()).toBe(false);
  });

  it('remembers the login in the browser and can log out', () => {
    auth.logIn('ash', 'PasSword123!');
    expect(localStorage.getItem('packvault-logged-in')).toBe('true');

    auth.logOut();
    expect(auth.isLoggedIn()).toBe(false);
    expect(localStorage.getItem('packvault-logged-in')).toBe('false');
  });
});
