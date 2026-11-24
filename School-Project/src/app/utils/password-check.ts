/**
 * The password rule from Assignment 2: at least 8 characters,
 * of which 2 are capital letters, 1 is a digit and 1 is a special character.
 *
 * Returns what is wrong with the password, or null if the password is valid.
 */
export function passwordProblem(password: string): string | null {
  // \p{Lu} = any capital letter (also Å, Ä, Ö). The "g" flag finds ALL of them, so we can count.
  const capitals = password.match(/\p{Lu}/gu) ?? [];
  const hasDigit = /\d/.test(password);
  // A special character = anything that is not a letter, a number or a space (like ! # ? @)
  const hasSpecial = /[^\p{L}\p{N}\s]/u.test(password);

  if (password.length < 8) return 'The password needs at least 8 characters.';
  if (capitals.length < 2) return 'The password needs at least 2 capital letters.';
  if (!hasDigit) return 'The password needs at least 1 number.';
  if (!hasSpecial) return 'The password needs at least 1 special character, like ! or #.';
  return null;
}
