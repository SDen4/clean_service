import { describe, expect, it } from 'vitest';

import type { ICategory, IRawCategory } from '../../types';
import { normalizeCategory } from '.';

describe('normalizeCategory', () => {
  it('нормализует "полную" категорию со всеми полями', () => {
    const raw: IRawCategory = {
      '@_id': 42,
      '@_parentId': 7,
      '#text': 'Электроника',
    };

    const result = normalizeCategory(raw);

    expect(result).toEqual<ICategory>({
      id: 42,
      parentId: 7,
      name: 'Электроника',
    });
  });

  it('возвращает parentId = null, если поле отсутствует (корневая категория)', () => {
    const raw: IRawCategory = {
      '@_id': 1,
      '#text': 'Корень',
    };

    const result = normalizeCategory(raw);

    expect(result.parentId).toBeNull();
    expect(result).toEqual<ICategory>({
      id: 1,
      parentId: null,
      name: 'Корень',
    });
  });

  it('приводит числовой "#text" к строке', () => {
    const raw: IRawCategory = {
      '@_id': 10,
      '@_parentId': 3,
      '#text': 12345,
    };

    const result = normalizeCategory(raw);

    expect(result.name).toBe('12345');
    expect(typeof result.name).toBe('string');
  });

  it('возвращает пустую строку, если "#text" отсутствует', () => {
    const raw: IRawCategory = {
      '@_id': 5,
      '@_parentId': 2,
    };

    const result = normalizeCategory(raw);

    expect(result.name).toBe('');
  });

  it('сохраняет "#text" = 0 как строку "0" (не пустая строка)', () => {
    const raw: IRawCategory = {
      '@_id': 5,
      '#text': 0,
    };

    const result = normalizeCategory(raw);

    expect(result.name).toBe('0');
  });

  it('сохраняет parentId = 0 (0 не является nullish)', () => {
    const raw: IRawCategory = {
      '@_id': 100,
      '@_parentId': 0,
      '#text': 'Дочерняя у нулевого родителя',
    };

    const result = normalizeCategory(raw);

    expect(result.parentId).toBe(0);
  });

  it('не мутирует входной объект', () => {
    const raw: IRawCategory = {
      '@_id': 1,
      '@_parentId': 2,
      '#text': 'Имя',
    };
    const snapshot = { ...raw };

    normalizeCategory(raw);

    expect(raw).toEqual(snapshot);
  });

  it('возвращает объект только с полями id, parentId, name', () => {
    const raw: IRawCategory = {
      '@_id': 11,
      '@_parentId': 22,
      '#text': 'Что-то',
    };

    const result = normalizeCategory(raw);

    expect(Object.keys(result).sort()).toEqual(['id', 'name', 'parentId']);
  });
});
