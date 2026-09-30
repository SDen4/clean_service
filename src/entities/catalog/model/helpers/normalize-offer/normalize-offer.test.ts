import { describe, expect, it } from 'vitest';

import type { IOffer, IRawOffer, IRawParam } from '../../types';
import { normalizeOffer } from '.';

// Помощник для тестов, где нужно проверить рантайм-поведение
// для значений, которые формально запрещены типами (null / undefined
// в required-полях), но которые могут прийти из XML на практике.
const asRawOffer = (o: Record<string, unknown>): IRawOffer =>
  o as unknown as IRawOffer;

const asRawParam = (p: Record<string, unknown>): IRawParam =>
  p as unknown as IRawParam;

describe('normalizeOffer', () => {
  // Все обязательные поля из IRawOffer.
  const baseRaw: IRawOffer = {
    '@_id': 1,
    '@_available': false,
    categoryId: 10,
  };

  it('приводит id к строке', () => {
    expect(normalizeOffer({ ...baseRaw, '@_id': 123 }).id).toBe('123');
    expect(normalizeOffer({ ...baseRaw, '@_id': 'abc' }).id).toBe('abc');
  });

  describe('available', () => {
    it('true только для true или "true"', () => {
      expect(
        normalizeOffer({ ...baseRaw, '@_available': true }).available,
      ).toBe(true);
      expect(
        normalizeOffer({ ...baseRaw, '@_available': 'true' }).available,
      ).toBe(true);
    });

    it('false для false, "false" и "1"', () => {
      expect(
        normalizeOffer({ ...baseRaw, '@_available': false }).available,
      ).toBe(false);
      expect(
        normalizeOffer({ ...baseRaw, '@_available': 'false' }).available,
      ).toBe(false);
      expect(normalizeOffer({ ...baseRaw, '@_available': '1' }).available).toBe(
        false,
      );
    });

    it('false, если поле отсутствует (граничный случай XML)', () => {
      const raw = asRawOffer({
        '@_id': 1,
        categoryId: 10,
        // '@_available' отсутствует
      });
      expect(normalizeOffer(raw).available).toBe(false);
    });
  });

  describe('price', () => {
    it('число и строка-число', () => {
      expect(normalizeOffer({ ...baseRaw, price: 100 }).price).toBe(100);
      expect(normalizeOffer({ ...baseRaw, price: '200.5' }).price).toBe(200.5);
    });

    it('0, если price отсутствует', () => {
      expect(normalizeOffer(baseRaw).price).toBe(0);
    });

    it('0, если price === null (граничный случай XML)', () => {
      const raw = asRawOffer({ ...baseRaw, price: null });
      expect(normalizeOffer(raw).price).toBe(0);
    });

    it('0, если price === ""', () => {
      expect(normalizeOffer({ ...baseRaw, price: '' }).price).toBe(0);
    });
  });

  it('currencyId: значение по умолчанию "RUB"', () => {
    expect(normalizeOffer({ ...baseRaw, currencyId: 'USD' }).currencyId).toBe(
      'USD',
    );
    expect(normalizeOffer(baseRaw).currencyId).toBe('RUB');
  });

  it('categoryId пробрасывается как есть', () => {
    expect(normalizeOffer({ ...baseRaw, categoryId: 42 }).categoryId).toBe(42);
  });

  describe('строковые поля по умолчанию', () => {
    it('пустая строка, если поля не переданы', () => {
      const offer = normalizeOffer(baseRaw);
      expect(offer.picture).toBe('');
      expect(offer.vendor).toBe('');
      expect(offer.name).toBe('');
      expect(offer.description).toBe('');
      expect(offer.url).toBe('');
    });

    it('пробрасываются без изменений', () => {
      const offer = normalizeOffer({
        ...baseRaw,
        picture: 'pic.jpg',
        vendor: 'Vendor',
        name: 'Name',
        description: 'Desc',
        url: 'http://example.com',
      });
      expect(offer.picture).toBe('pic.jpg');
      expect(offer.vendor).toBe('Vendor');
      expect(offer.name).toBe('Name');
      expect(offer.description).toBe('Desc');
      expect(offer.url).toBe('http://example.com');
    });
  });

  describe('vendorCode', () => {
    it('число -> строка', () => {
      expect(normalizeOffer({ ...baseRaw, vendorCode: 123 }).vendorCode).toBe(
        '123',
      );
    });

    it('строка пробрасывается как есть', () => {
      expect(normalizeOffer({ ...baseRaw, vendorCode: 'ABC' }).vendorCode).toBe(
        'ABC',
      );
    });

    it('"" если не передано', () => {
      expect(normalizeOffer(baseRaw).vendorCode).toBe('');
    });
  });

  describe('params (paramsToRecord)', () => {
    it('пустой объект, если param отсутствует', () => {
      expect(normalizeOffer(baseRaw).params).toEqual({});
    });

    it('одиночный param', () => {
      const offer = normalizeOffer({
        ...baseRaw,
        param: { '@_name': 'color', '#text': 'red' },
      });
      expect(offer.params).toEqual({ color: 'red' });
    });

    it('массив param', () => {
      const offer = normalizeOffer({
        ...baseRaw,
        param: [
          { '@_name': 'color', '#text': 'red' },
          { '@_name': 'size', '#text': 'XL' },
        ],
      });
      expect(offer.params).toEqual({ color: 'red', size: 'XL' });
    });

    it('числовое значение приводится к строке', () => {
      const offer = normalizeOffer({
        ...baseRaw,
        param: { '@_name': 'weight', '#text': 100 },
      });
      expect(offer.params).toEqual({ weight: '100' });
    });

    it('значение 0 сохраняется как строка "0"', () => {
      const offer = normalizeOffer({
        ...baseRaw,
        param: { '@_name': 'count', '#text': 0 },
      });
      expect(offer.params).toEqual({ count: '0' });
    });

    it('undefined/#text отсутствует -> пустая строка', () => {
      const offer = normalizeOffer({
        ...baseRaw,
        param: { '@_name': 'empty' },
      });
      expect(offer.params).toEqual({ empty: '' });
    });

    it('null в #text -> пустая строка (граничный случай XML)', () => {
      const offer = normalizeOffer({
        ...baseRaw,
        param: asRawParam({ '@_name': 'a', '#text': null }),
      });
      expect(offer.params).toEqual({ a: '' });
    });

    it('param без имени пропускается (граничный случай XML)', () => {
      const offer = normalizeOffer({
        ...baseRaw,
        param: [
          { '@_name': 'color', '#text': 'red' },
          asRawParam({ '#text': 'no name' }),
          asRawParam({ '@_name': '', '#text': 'empty name' }),
        ],
      });
      expect(offer.params).toEqual({ color: 'red' });
    });

    it('последний param с тем же именем перезаписывает предыдущий', () => {
      const offer = normalizeOffer({
        ...baseRaw,
        param: [
          { '@_name': 'color', '#text': 'red' },
          { '@_name': 'color', '#text': 'blue' },
        ],
      });
      expect(offer.params).toEqual({ color: 'blue' });
    });
  });

  it('возвращает объект со всеми полями IOffer', () => {
    const offer: IOffer = normalizeOffer(baseRaw);
    expect(Object.keys(offer).sort()).toEqual(
      [
        'available',
        'categoryId',
        'currencyId',
        'description',
        'id',
        'name',
        'params',
        'picture',
        'price',
        'url',
        'vendor',
        'vendorCode',
      ].sort(),
    );
  });
});
