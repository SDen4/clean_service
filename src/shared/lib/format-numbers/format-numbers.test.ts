import { formatNumbers } from '.';

import { describe, expect, test } from 'vitest';

describe('Format numbers unit tests', () => {
  test('default round', () => {
    const result = formatNumbers(12.12345);

    expect(result).toBe('12');
  });

  test('round', () => {
    const result = formatNumbers(12.12345, 2);

    expect(result).toBe('12,12');
  });

  test('round with minDegree', () => {
    const result = formatNumbers(12.1, 2, 2);

    expect(result).toBe('12,10');
  });

  test('negative', () => {
    const result = formatNumbers();

    expect(result).toBe('');
  });

  test('negative null', () => {
    const result = formatNumbers(null);

    expect(result).toBe('');
  });
});
