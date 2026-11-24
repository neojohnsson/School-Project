import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { Login } from './login';

describe('Login', () => {
  let fixture: ComponentFixture<Login>;
  let page: HTMLElement;
  let router: Router;

  beforeEach(async () => {
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

  it('shows an error when the fields are empty', async () => {
    click('Log in');
    await fixture.whenStable();

    expect(page.querySelector('.error')?.textContent).toContain('Please fill in');
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('opens the collection after logging in', async () => {
    type('username', 'ash');
    type('password', 'pikachu');
    click('Log in');
    await fixture.whenStable();

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
