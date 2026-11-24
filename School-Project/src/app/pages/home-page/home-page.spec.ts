import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { HomePage } from './home-page';

describe('HomePage', () => {
  let fixture: ComponentFixture<HomePage>;
  let page: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [provideRouter([])], // the header uses routerLink, which needs a router
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    page = fixture.nativeElement;
    await fixture.whenStable();
  });

  /** Names of all the cards that are on screen right now. */
  const cardNames = () =>
    Array.from(page.querySelectorAll('app-pokemon-card .name')).map((el) => el.textContent?.trim());

  it('shows the 12 owned cards and the 3 empty spots', () => {
    expect(page.querySelectorAll('app-pokemon-card').length).toBe(12);
    expect(page.querySelectorAll('.empty-slot').length).toBe(3);
  });

  it('shows how many cards are collected', () => {
    expect(page.querySelector('.progress-count')?.textContent).toContain('12 / 151');
  });

  it('shows only Fire cards after clicking the Fire tab', async () => {
    const tabs = Array.from(page.querySelectorAll<HTMLButtonElement>('.tab'));
    tabs.find((tab) => tab.textContent?.trim() === 'Fire')!.click();
    await fixture.whenStable();

    expect(cardNames()).toEqual(['Charmander', 'Charizard']);
    expect(page.querySelectorAll('.empty-slot').length).toBe(0);
  });

  it('finds a card by name', async () => {
    const input = page.querySelector<HTMLInputElement>('.search input')!;
    input.value = 'pika';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    expect(cardNames()).toEqual(['Pikachu']);
  });
});
