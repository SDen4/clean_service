import type { IOffer, IRawOffer, IRawParam } from '../../types';
import { toArray } from '../to-array';

/** Из <param name="X">Y</param> делает { X: "Y" } */
const paramsToRecord = (
  raw?: IRawParam | IRawParam[],
): Record<string, string> => {
  const result: Record<string, string> = {};
  for (const p of toArray(raw)) {
    const key = p['@_name'];
    // eslint-disable-next-line no-continue
    if (!key) continue;
    const value = p['#text'];
    result[key] = value === undefined || value === null ? '' : String(value);
  }
  return result;
};

export const normalizeOffer = (raw: IRawOffer): IOffer => ({
  id: String(raw['@_id']),
  available: raw['@_available'] === true || raw['@_available'] === 'true',
  price: Number(raw.price ?? 0),
  currencyId: raw.currencyId ?? 'RUB',
  categoryId: raw.categoryId,
  picture: raw.picture ?? '',
  vendor: raw.vendor ?? '',
  vendorCode: raw.vendorCode !== undefined ? String(raw.vendorCode) : '',
  name: raw.name ?? '',
  description: raw.description ?? '',
  url: raw.url ?? '',
  params: paramsToRecord(raw.param),
});
