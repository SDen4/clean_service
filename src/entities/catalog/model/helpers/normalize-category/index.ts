import type { ICategory, IRawCategory } from '../../types';

export const normalizeCategory = (raw: IRawCategory): ICategory => ({
  id: raw['@_id'],
  parentId: raw['@_parentId'] ?? null,
  name: raw['#text'] !== undefined ? String(raw['#text']) : '',
});
