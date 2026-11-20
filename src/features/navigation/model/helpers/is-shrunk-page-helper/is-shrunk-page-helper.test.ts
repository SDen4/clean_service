import { describe, expect, test } from 'vitest';

import { isShrunkPageHelper } from '.';

describe('is-shrunk-page-helper tests', () => {
  test('negative - product page', () => {
    const result = isShrunkPageHelper('/catalog/1/1/1');

    expect(result).toBe(false);
  });

  test('negative - services page', () => {
    const result = isShrunkPageHelper('/services');

    expect(result).toBe(false);
  });

  test('positive - catalog page', () => {
    const result = isShrunkPageHelper('/catalog');

    expect(result).toBe(true);
  });

  test('positive - catalog-search page', () => {
    const result = isShrunkPageHelper('/catalog');

    expect(result).toBe(true);
  });

  test('positive - visited-products page', () => {
    const result = isShrunkPageHelper('/visited-products');

    expect(result).toBe(true);
  });

  test('positive - products list page', () => {
    const result = isShrunkPageHelper('/catalog/1/1');

    expect(result).toBe(true);
  });

  test('negative - no path name', () => {
    const result = isShrunkPageHelper();

    expect(result).toBe(false);
  });
});
