import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Login page (page 1 in Figma): username, password, "Log in" and "Create account".
 *
 * NOTE: there is no backend yet, so we can't really check passwords or save accounts.
 * For now both buttons only check that the fields are filled in, then open the collection.
 * Later, call your backend here (for example with Angular's HttpClient).
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  /** The Router lets us change page from code (instead of a link). */
  private readonly router = inject(Router);

  protected readonly showPassword = signal(false);
  protected readonly error = signal('');

  protected togglePassword(): void {
    this.showPassword.update((shown) => !shown);
  }

  /** "Log in" button (also runs when you press Enter in a field). */
  protected logIn(event: Event, username: string, password: string): void {
    event.preventDefault(); // stop the browser from reloading the page on submit
    this.continue(username, password);
  }

  /** "Create account" button. */
  protected createAccount(username: string, password: string): void {
    this.continue(username, password);
  }

  private continue(username: string, password: string): void {
    if (!username.trim() || !password) {
      this.error.set('Please fill in your username and password.');
      return;
    }
    this.error.set('');
    this.router.navigate(['/home']);
  }
}
