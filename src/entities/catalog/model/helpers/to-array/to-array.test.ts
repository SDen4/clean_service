import { describe, expect, it } from 'vitest';

import { toArray } from '.';

describe('toArray', () => {
  it('возвращает пустой массив для undefined', () => {
    expect(toArray(undefined)).toEqual([]);
  });

  it('оборачивает одиночное значение в массив', () => {
    expect(toArray(1)).toEqual([1]);
    expect(toArray('a')).toEqual(['a']);
    expect(toArray({ x: 1 })).toEqual([{ x: 1 }]);
  });

  it('возвращает исходный массив без изменений', () => {
    const arr = [1, 2, 3];
    expect(toArray(arr)).toBe(arr);
    expect(toArray(arr)).toEqual([1, 2, 3]);
  });

  it('возвращает пустой массив, если передан пустой массив', () => {
    const arr: number[] = [];
    expect(toArray(arr)).toBe(arr);
    expect(toArray(arr)).toEqual([]);
  });

  it('не путает falsy-значения с undefined', () => {
    expect(toArray(0)).toEqual([0]);
    expect(toArray('')).toEqual(['']);
    expect(toArray(false)).toEqual([false]);
    expect(toArray(NaN)).toEqual([NaN]);
  });

  it('null (граничный случай XML) оборачивается в массив, т.к. проверка только на undefined', () => {
    // Тип не допускает null, но из XML рантайм может его вернуть.
    const asValue = null as unknown as number | undefined;
    expect(toArray(asValue)).toEqual([null]);
  });

  it('корректно работает с типом элемента, отличным от number/string', () => {
    interface Item {
      name: string;
    }
    const single: Item = { name: 'one' };
    const many: Item[] = [{ name: 'one' }, { name: 'two' }];

    expect(toArray<Item>(single)).toEqual([{ name: 'one' }]);
    expect(toArray<Item>(many)).toBe(many);
    expect(toArray<Item>(undefined)).toEqual([]);
  });

  it('возвращает новый массив для одиночного значения (не тот же объект)', () => {
    const value = [1, 2, 3]; // массив как значение, но передадим его как T, чтобы обернуть
    const wrapped = toArray<number[] | number>(
      value as unknown as number | number[],
    );
    // если value — массив, вернётся он же; для чистоты проверим одиночный объект:
    const obj = { a: 1 };
    const result = toArray(obj);
    expect(result).not.toBe(obj);
    expect(result[0]).toBe(obj);
    expect(wrapped).toBe(value);
  });
});
