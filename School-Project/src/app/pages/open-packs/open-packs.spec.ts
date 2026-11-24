import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MemoryStorage } from '../../../testing/memory-storage';
import { CollectionService } from '../../services/collection.service';
import { OpenPacks } from './open-packs';

describe('OpenPacks', () => {
  let fixture: ComponentFixture<OpenPacks>;
  let page: HTMLElement;

  beforeEach(async () => {
    // A fresh, empty storage, so every test starts with the starter collection
    vi.stubGlobal('localStorage', new MemoryStorage());
    await TestBed.configureTestingModule({
      imports: [OpenPacks],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(OpenPacks);
    page = fixture.nativeElement;
    await fixture.whenStable();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const click = (text: string) => {
    const buttons = Array.from(page.querySelectorAll('button'));
    buttons.find((button) => button.textContent?.trim() === text)!.click();
  };
  const title = () => page.querySelector('h1')?.textContent?.trim();

  it('starts with a sealed pack', () => {
    expect(title()).toBe('Open a pack');
    expect(page.querySelector('app-booster-pack')).toBeTruthy();
  });

  it('skips to the summary with 5 cards and saves them', async () => {
    const collection = TestBed.inject(CollectionService);
    const totalCopies = () =>
      collection.slots().reduce((sum, slot) => sum + (slot.card?.copies ?? 0), 0);
    const before = totalCopies();

    click('Skip animation');
    await fixture.whenStable();

    expect(title()).toBe('Pack opened');
    expect(page.querySelectorAll('app-pokemon-card').length).toBe(5);
    expect(totalCopies() - before).toBe(5);
  });

  it('reveals the cards one by one', () => {
    vi.useFakeTimers(); // lets the test jump forward in time instead of waiting

    click('Open pack');
    vi.advanceTimersByTime(2000); // tearing (about 0.7 s) + opening animation (1.1 s)
    fixture.detectChanges();
    expect(page.textContent).toContain('Card 1 of 5');

    click('Next card');
    fixture.detectChanges();
    expect(page.textContent).toContain('Card 2 of 5');
  });
});
