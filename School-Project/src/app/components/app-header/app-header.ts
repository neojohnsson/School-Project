import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CollectionService } from '../../services/collection.service';

/**
 * The navigation at the top of the Open Packs and Collection pages.
 * Left: the page links. Right: "Log in", or "Clear saved data" + "Log out" when logged in.
 *
 * Use it like this:  <app-header />
 */
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './app-header.html',
  styleUrl: './app-header.css',
})
export class AppHeader {
  private readonly auth = inject(AuthService);
  private readonly collection = inject(CollectionService);
  private readonly router = inject(Router);

  /** The template uses this to choose which buttons to show. */
  protected readonly isLoggedIn = this.auth.isLoggedIn;

  /** "Log out": log out and go to the login page. */
  protected logOut(): void {
    this.auth.logOut();
    this.router.navigate(['/login']);
  }

  /**
   * "Clear saved data": deletes everything the app saved in the browser (your cards and
   * your login), so the app starts like the first time. Then go to the login page.
   */
  protected clearSavedData(): void {
    // 1. Reset what the app has in memory right now
    this.auth.logOut();
    this.collection.reset();
    // 2. Delete everything saved in localStorage
    try {
      localStorage.clear();
    } catch {
      // localStorage can be blocked (private mode); then there is nothing saved anyway.
    }
    this.router.navigate(['/login']);
  }
}
