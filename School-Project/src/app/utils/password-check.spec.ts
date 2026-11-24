import { passwordProblem } from './password-check';

describe('passwordProblem', () => {
  it('accepts a valid password', () => {
    expect(passwordProblem('PasSword123!')).toBeNull();
    expect(passwordProblem('ÅÄbcdef1#')).toBeNull(); // Swedish capitals count too
  });

  it('says what is wrong with an invalid password', () => {
    expect(passwordProblem('Ab1!')).toBe('The password needs at least 8 characters.');
    expect(passwordProblem('Password1!')).toBe('The password needs at least 2 capital letters.');
    expect(passwordProblem('PassWord!!')).toBe('The password needs at least 1 number.');
    expect(passwordProblem('PassWord12')).toBe(
      'The password needs at least 1 special character, like ! or #.',
    );
  });
});
