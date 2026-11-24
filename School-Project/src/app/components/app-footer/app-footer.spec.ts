import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AppFooter } from './app-footer';

describe('AppFooter', () => {
  let footer: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppFooter],
      providers: [provideRouter([])], // the footer links use routerLink
    }).compileComponents();
    const fixture = TestBed.createComponent(AppFooter);
    await fixture.whenStable();
    footer = fixture.nativeElement;
  });

  it('shows who made the app', () => {
    expect(footer.textContent).toContain('Made by Neo and Kevin');
  });

  it('has an SVG image, links to the pages and an external link', () => {
    expect(footer.querySelector('img')?.getAttribute('src')).toBe('images/logo.svg');

    const links = Array.from(footer.querySelectorAll('a')).map((a) => a.getAttribute('href'));
    expect(links).toEqual(['/home', '/open-packs', '/login', 'https://pokeapi.co']);
  });
});
