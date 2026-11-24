import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

/**
 * Login page (page 1 in Figma): username, password and "Log in".
 *
 * NOTE: there is no backend yet, so there is only one built-in account (see AuthService).
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
  private readonly auth = inject(AuthService);

  protected readonly showPassword = signal(false);
  /** The small text under the fields, for example "Wrong username or password." */
  protected readonly message = signal('');

  protected togglePassword(): void {
    this.showPassword.update((shown) => !shown);
  }

  /** "Log in" button (also runs when you press Enter in a field). */
  protected logIn(event: Event, username: string, password: string): void {
    event.preventDefault(); // stop the browser from reloading the page on submit

    if (!username.trim() || !password) {
      this.message.set('Please fill in your username and password.');
      return;
    }
    if (!this.auth.logIn(username, password)) {
      this.message.set('Wrong username or password.');
      return;
    }
    this.message.set('');
    this.router.navigate(['/home']);
  }
}
