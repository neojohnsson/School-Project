import { Injectable, signal } from '@angular/core';

/** The only account for now. */
const USERNAME = 'user';
/** The password in base64 ("cGFzc3dvcmQ=" is "password"), so it is not written as plain text. */
const PASSWORD_BASE64 = 'cGFzc3dvcmQ=';

/** The name we save "logged in" under in the browser. */
const STORAGE_KEY = 'packvault-logged-in';

/**
 * Remembers if the player is logged in.
 * Like the CollectionService, there is only ONE of it for the whole app (providedIn: 'root').
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  /** true = logged in. Saved in the browser, so a reload does not log you out. */
  readonly isLoggedIn = signal(loadLoggedIn());

  /** Checks the username and password. Returns true if they are correct. */
  logIn(username: string, password: string): boolean {
    const correct = username.trim() === USERNAME && toBase64(password) === PASSWORD_BASE64;
    if (correct) {
      this.setLoggedIn(true);
    }
    return correct;
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

/** btoa() turns text into base64. It fails on some special characters (like emoji). */
function toBase64(text: string): string {
  try {
    return btoa(text);
  } catch {
    return '';
  }
}

function loadLoggedIn(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}
