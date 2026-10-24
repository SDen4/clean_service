import { describe, expect, it } from 'vitest';

import { getProductIdFromPath } from '.';

describe('getProductIdFromPath', () => {
  it('возвращает пустую строку, если path не передан', () => {
    expect(getProductIdFromPath()).toBe('');
  });

  it('возвращает пустую строку для пустой строки', () => {
    expect(getProductIdFromPath('')).toBe('');
  });

  it('возвращает весь path, если в нём нет слешей', () => {
    expect(getProductIdFromPath('123')).toBe('123');
  });

  it('возвращает последний сегмент пути', () => {
    expect(getProductIdFromPath('/products/123')).toBe('123');
  });

  it('работает с относительным путём', () => {
    expect(getProductIdFromPath('products/456')).toBe('456');
  });

  it('возвращает пустую строку, если путь заканчивается на /', () => {
    expect(getProductIdFromPath('/products/123/')).toBe('');
  });

  it('возвращает пустую строку для строки из одного слеша', () => {
    expect(getProductIdFromPath('/')).toBe('');
  });

  it('возвращает пустую строку для строки из нескольких слешей', () => {
    expect(getProductIdFromPath('///')).toBe('');
  });

  it('поддерживает числовые id', () => {
    expect(getProductIdFromPath('/products/42')).toBe('42');
  });

  it('поддерживает uuid в качестве id', () => {
    const uuid = '550e8400-e29b-41d4-a716-446655440000';
    expect(getProductIdFromPath(`/products/${uuid}`)).toBe(uuid);
  });

  it('не матчит null как falsy путь', () => {
    expect(getProductIdFromPath(null as any)).toBe('');
  });
});
