import { describe, expect, test } from 'vitest';

import { createEmailError } from '.';

describe('create-email-error', () => {
  test('No error', () => {
    const result = createEmailError('test@test.ts');

    expect(result).toBe('');
  });

  test('No valid email (1)', () => {
    const result = createEmailError('test@tes@t.ts');

    expect(result).toBe('Неверный формат email');
  });

  test('No valid email (2)', () => {
    const result = createEmailError('test@test');

    expect(result).toBe('Неверный формат email');
  });

  test('No email', () => {
    const result = createEmailError();

    expect(result).toBe('Email обязателен');
  });
});
