import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { MemoryStorage } from '../../../testing/memory-storage';
import { CARD_SET } from '../../data/card-set';
import { AuthService } from '../../services/auth.service';
import { CollectionService } from '../../services/collection.service';
import { AppHeader } from './app-header';

describe('AppHeader', () => {
  let fixture: ComponentFixture<AppHeader>;
  let header: HTMLElement;
  let auth: AuthService;
  let router: Router;

  beforeEach(async () => {
    vi.stubGlobal('localStorage', new MemoryStorage()); // start logged out
    await TestBed.configureTestingModule({
      imports: [AppHeader],
      providers: [provideRouter([])],
    }).compileComponents();

    auth = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);
    fixture = TestBed.createComponent(AppHeader);
    header = fixture.nativeElement;
    await fixture.whenStable();
  });

  /** The texts of the account buttons on the right. */
  const accountButtons = () =>
    Array.from(header.querySelectorAll('.account a, .account button')).map((el) =>
      el.textContent?.trim(),
    );
  const click = (text: string) => {
    const buttons = Array.from(header.querySelectorAll<HTMLElement>('.account button'));
    buttons.find((button) => button.textContent?.trim() === text)!.click();
  };

  it('shows "Log in" when you are logged out', () => {
    expect(accountButtons()).toEqual(['Log in']);
  });

  it('shows "Clear saved data" and "Log out" when you are logged in', async () => {
    auth.logIn('ash', 'PasSword123!');
    await fixture.whenStable();

    expect(accountButtons()).toEqual(['Clear saved data', 'Log out']);
  });

  it('logs out and goes to the login page', async () => {
    auth.logIn('ash', 'PasSword123!');
    await fixture.whenStable();

    click('Log out');

    expect(auth.isLoggedIn()).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('clears the saved cards and the login', async () => {
    const collection = TestBed.inject(CollectionService);
    auth.logIn('ash', 'PasSword123!');
    collection.addCards([CARD_SET.find((card) => card.name === 'Dragonite')!]);
    expect(collection.ownedCount()).toBe(13);
    await fixture.whenStable();

    click('Clear saved data');

    expect(auth.isLoggedIn()).toBe(false);
    expect(collection.ownedCount()).toBe(12); // back to the starter cards
    expect(localStorage.length).toBe(0); // nothing saved anymore
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
