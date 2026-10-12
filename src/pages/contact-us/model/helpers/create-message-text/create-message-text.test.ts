import { describe, expect, test } from 'vitest';

import type { IOffer } from '@/entities/catalog';

import { createMessageText } from '.';

const offer: IOffer = {
  id: 'string',
  available: true,
  price: 1000,
  currencyId: 'string',
  categoryId: 1,
  picture: 'string',
  vendor: 'string',
  vendorCode: 'string',
  name: 'string',
  description: 'string',
  url: 'string',
  params: { a: 'a' },
};

describe('create-message-text tests', () => {
  test('positive case (string)', () => {
    const result = createMessageText(offer);

    expect(result).toBe(`Добрый день!
Интересует ${offer?.name} (${offer?.vendor}, арт: ${offer?.vendorCode}, цена: ${offer?.price} руб.)`);
  });

  test('case no name', () => {
    // FOR TEST ONLY!
    // @ts-expect-error
    const result = createMessageText({ ...offer, name: undefined });

    expect(result).toBe(`Добрый день!
Интересует  (${offer?.vendor}, арт: ${offer?.vendorCode}, цена: ${offer?.price} руб.)`);
  });

  test('case no vendor', () => {
    // FOR TEST ONLY!
    // @ts-expect-error
    const result = createMessageText({ ...offer, vendor: undefined });

    expect(result).toBe(`Добрый день!
Интересует ${offer?.name} (, арт: ${offer?.vendorCode}, цена: ${offer?.price} руб.)`);
  });

  test('case no vendorCode', () => {
    // FOR TEST ONLY!
    // @ts-expect-error
    const result = createMessageText({ ...offer, vendorCode: undefined });

    expect(result).toBe(`Добрый день!
Интересует ${offer?.name} (${offer?.vendor}, арт: -, цена: ${offer?.price} руб.)`);
  });

  test('case no price', () => {
    // FOR TEST ONLY!
    // @ts-expect-error
    const result = createMessageText({ ...offer, price: undefined });

    expect(result).toBe(`Добрый день!
Интересует ${offer?.name} (${offer?.vendor}, арт: ${offer?.vendorCode}, цена: - руб.)`);
  });
});
