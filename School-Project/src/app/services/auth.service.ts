import { Injectable, signal } from '@angular/core';
import { passwordProblem } from '../utils/password-check';

/** The name we save "logged in" under in the browser. */
const STORAGE_KEY = 'packvault-logged-in';

/**
 * Remembers if the player is logged in.
 * Like the CollectionService, there is only ONE of it for the whole app (providedIn: 'root').
 *
 * There is no backend, so any username works, as long as the password follows the rule
 * from Assignment 2 (see utils/password-check.ts).
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  /** true = logged in. Saved in the browser, so a reload does not log you out. */
  readonly isLoggedIn = signal(loadLoggedIn());

  /** Logs in if there is a username and the password is valid. Returns true if it worked. */
  logIn(username: string, password: string): boolean {
    const ok = username.trim() !== '' && passwordProblem(password) === null;
    if (ok) {
      this.setLoggedIn(true);
    }
    return ok;
  }

  logOut(): void {
    this.setLoggedIn(false);
  }

  private setLoggedIn(value: boolean): void {
    this.isLoggedIn.set(value);
    try {
      localStorage.setItem(STORAGE_KEY, String(value));
    } catch {
      // If saving fails you stay logged in until you reload the page.
    }
  }
}

function loadLoggedIn(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}
