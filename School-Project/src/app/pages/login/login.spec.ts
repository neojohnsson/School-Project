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

  it('shows an error for a wrong password', async () => {
    type('username', 'user');
    type('password', 'wrong');
    click('Log in');
    await fixture.whenStable();

    expect(error()).toBe('Wrong username or password.');
    expect(TestBed.inject(AuthService).isLoggedIn()).toBe(false);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('logs in with the right username and password', async () => {
    type('username', 'user');
    type('password', 'password');
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
