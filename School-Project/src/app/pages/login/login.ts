import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { passwordProblem } from '../../utils/password-check';

/**
 * Login page (page 1 in Figma): username, password and "Log in".
 *
 * "Log in" checks that the password is valid (Assignment 2): at least 8 characters,
 * 2 capital letters, 1 number and 1 special character. There is no backend, so any
 * username with a valid password logs you in.
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
    // Check the password rule (Assignment 2) and say what is wrong
    const problem = passwordProblem(password);
    if (problem) {
      this.message.set(problem);
      return;
    }
    this.auth.logIn(username, password);
    this.message.set('');
    this.router.navigate(['/home']);
  }
}
