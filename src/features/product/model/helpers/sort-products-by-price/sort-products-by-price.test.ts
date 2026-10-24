// sortProductsByPrice.spec.ts
import { describe, expect, it } from 'vitest';

import type { IOffer } from '@/entities/catalog';

import { sortProductsByPrice } from '.';

const offer = (price: number) => ({ price }) as IOffer;

describe('sortProductsByPrice', () => {
  describe("sort = 'none'", () => {
    it('возвращает 0 для любых пар товаров', () => {
      const cmp = sortProductsByPrice('none');

      expect(cmp(offer(1), offer(2))).toBe(0);
      expect(cmp(offer(2), offer(1))).toBe(0);
      expect(cmp(offer(1), offer(1))).toBe(0);
    });

    it('не меняет порядок массива при сортировке', () => {
      const items = [offer(3), offer(1), offer(2)];

      const sorted = [...items].sort(sortProductsByPrice('none'));

      expect(sorted.map((o) => o.price)).toEqual([3, 1, 2]);
    });
  });

  describe("sort = 'asc'", () => {
    it('возвращает положительное число, если a.price > b.price', () => {
      expect(sortProductsByPrice('asc')(offer(2), offer(1))).toBeGreaterThan(0);
    });

    it('возвращает отрицательное число, если a.price < b.price', () => {
      expect(sortProductsByPrice('asc')(offer(1), offer(2))).toBeLessThan(0);
    });

    it('возвращает -1 при равных ценах (текущее поведение)', () => {
      // Внимание: компаратор не возвращает 0 при равенстве —
      // это потенциальный баг, тест фиксирует текущее поведение.
      expect(sortProductsByPrice('asc')(offer(5), offer(5))).toBe(-1);
    });

    it('сортирует массив по возрастанию цены', () => {
      const items = [offer(3), offer(1), offer(2), offer(10)];

      const sorted = [...items].sort(sortProductsByPrice('asc'));

      expect(sorted.map((o) => o.price)).toEqual([1, 2, 3, 10]);
    });
  });

  describe("sort = 'desc'", () => {
    it('возвращает положительное число, если a.price < b.price', () => {
      expect(sortProductsByPrice('desc')(offer(1), offer(2))).toBeGreaterThan(
        0,
      );
    });

    it('возвращает отрицательное число, если a.price > b.price', () => {
      expect(sortProductsByPrice('desc')(offer(2), offer(1))).toBeLessThan(0);
    });

    it('возвращает -1 при равных ценах (текущее поведение)', () => {
      expect(sortProductsByPrice('desc')(offer(5), offer(5))).toBe(-1);
    });

    it('сортирует массив по убыванию цены', () => {
      const items = [offer(3), offer(1), offer(10), offer(2)];

      const sorted = [...items].sort(sortProductsByPrice('desc'));

      expect(sorted.map((o) => o.price)).toEqual([10, 3, 2, 1]);
    });
  });

  describe('общие свойства', () => {
    it('возвращает функцию-компаратор', () => {
      expect(typeof sortProductsByPrice('asc')).toBe('function');
      expect(typeof sortProductsByPrice('desc')).toBe('function');
      expect(typeof sortProductsByPrice('none')).toBe('function');
    });

    it('не мутирует исходный массив', () => {
      const items = [offer(2), offer(1), offer(3)];
      const snapshot = items.map((o) => o.price);

      [...items].sort(sortProductsByPrice('asc'));

      expect(items.map((o) => o.price)).toEqual(snapshot);
    });

    it('asc и desc дают зеркальный порядок для массива', () => {
      const items = [offer(1), offer(3), offer(2)];

      const asc = [...items]
        .sort(sortProductsByPrice('asc'))
        .map((o) => o.price);
      const desc = [...items]
        .sort(sortProductsByPrice('desc'))
        .map((o) => o.price);

      expect(asc).toEqual([...desc].reverse());
    });
  });
});
