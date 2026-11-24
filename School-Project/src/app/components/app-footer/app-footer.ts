import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * The footer at the bottom of every page. It is added once in app.html.
 * It has the logo (SVG), who made the app, links to the pages and one external link.
 *
 * Use it like this:  <app-footer />
 */
@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './app-footer.html',
  styleUrl: './app-footer.css',
})
export class AppFooter {}
