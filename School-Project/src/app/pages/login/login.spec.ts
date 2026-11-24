import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { MemoryStorage } from '../../../testing/memory-storage';
import { AuthService } from '../../services/auth.service';
import { Login } from './login';

describe('Login', () => {
  let fixture: ComponentFixture<Login>;
  let page: HTMLElement;
  let router: Router;

  beforeEach(async () => {
    vi.stubGlobal('localStorage', new MemoryStorage()); // start logged out
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    page = fixture.nativeElement;
    router = TestBed.inject(Router);
    // Pretend to change page, so we can check WHERE the login wants to go.
    vi.spyOn(router, 'navigate').mockResolvedValue(true);
    await fixture.whenStable();
  });

  const type = (id: string, value: string) => {
    page.querySelector<HTMLInputElement>('#' + id)!.value = value;
  };
  const click = (text: string) => {
    const buttons = Array.from(page.querySelectorAll('button'));
    buttons.find((button) => button.textContent?.trim() === text)!.click();
  };
  const error = () => page.querySelector('.message')?.textContent?.trim();

  it('shows an error when the fields are empty', async () => {
    click('Log in');
    await fixture.whenStable();

    expect(error()).toContain('Please fill in');
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('says what is wrong with an invalid password', async () => {
    type('username', 'ash');
    type('password', 'password'); // no capitals, no number, no special character
    click('Log in');
    await fixture.whenStable();

    expect(error()).toBe('The password needs at least 2 capital letters.');
    expect(TestBed.inject(AuthService).isLoggedIn()).toBe(false);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('logs in with a valid password', async () => {
    type('username', 'ash');
    type('password', 'PasSword123!');
    click('Log in');
    await fixture.whenStable();

    expect(TestBed.inject(AuthService).isLoggedIn()).toBe(true);
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('shows the password after clicking Show', async () => {
    const password = page.querySelector<HTMLInputElement>('#password')!;
    expect(password.type).toBe('password');

    click('Show');
    await fixture.whenStable();

    expect(password.type).toBe('text');
  });
});
