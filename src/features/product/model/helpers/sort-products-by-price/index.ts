import type { IOffer } from '@/entities/catalog';

import type { TSortState } from '../../types';

/** Сортировка списка товаров по цене */
export const sortProductsByPrice =
  (sort: TSortState) => (a?: IOffer, b?: IOffer) => {
    if (sort !== 'none') {
      if (sort === 'asc') {
        return a?.price && b?.price && a.price > b.price ? 1 : -1;
      } else {
        return a?.price && b?.price && b.price > a.price ? 1 : -1;
      }
    }
    return 0;
  };
