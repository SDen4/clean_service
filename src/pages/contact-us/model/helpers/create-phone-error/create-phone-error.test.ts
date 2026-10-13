import { describe, expect, test } from 'vitest';

import { createPhoneError } from '.';

describe('create-phone-error tests', () => {
  test('valid phone number', () => {
    const result = createPhoneError('+7(922)222-22-22');

    expect(result).toBe('');
  });

  test('invalid phone number', () => {
    const result = createPhoneError('+7(922)222-22-2');

    expect(result).toBe('Неправильный формат телефона');
  });

  test('no phone number', () => {
    const result = createPhoneError();

    expect(result).toBe('Телефон обязателен');
  });

  test('no phone number', () => {
    // @ts-expect-error
    const result = createPhoneError(null);

    expect(result).toBe('Телефон обязателен');
  });
});
