import { useMemo } from 'react';

import { useProducts } from '@/entities/catalog';

import { setLocalStorage, useLocalStorage } from '@/shared/lib';

/** Ключ localstorage для id просмотренных товаров */
export const VISITED_PRODUCTS = 'VISITED_PRODUCTS';

/** Максимальное кол-во элементов в просмотренных */
const MAX_VISITED_ITEMS = 10;

/** Запись в localstorage идентификаторов просмотренных товаров */
export const useVisitedProducts = () => {
  const { offers } = useProducts((store) => store);

  const visitedProductsIdsStr = useLocalStorage(VISITED_PRODUCTS);

  const visitedProductsIds = useMemo(
    () =>
      visitedProductsIdsStr?.length ? visitedProductsIdsStr.split(',') : [],
    [visitedProductsIdsStr],
  );

  /** Список просмотренных товаров */
  const visitedProducts = useMemo(
    () =>
      visitedProductsIds.map((id) =>
        offers.find((el) => String(el.id) === String(id)),
      ),
    [offers, visitedProductsIds],
  );

  /** Добавить в список просмотренных товаров новый id товара */
  const setVisitedProduct = (productId?: number | string) => {
    // дубль
    if (productId && visitedProductsIds.includes(String(productId))) return;

    // пустой список
    if (!visitedProductsIds.length) {
      setLocalStorage(VISITED_PRODUCTS, `${productId}`);
      return;
    }

    // максимальное кол-во в просмотренных
    if (visitedProductsIds.length >= MAX_VISITED_ITEMS) {
      const res = visitedProductsIds.concat();
      res.shift();
      res.push(String(productId));
      setLocalStorage(VISITED_PRODUCTS, res.join(','));
      return;
    }

    // валидный кейс добавления в список просмотренных
    setLocalStorage(VISITED_PRODUCTS, `${visitedProductsIdsStr},${productId}`);
  };

  /** Удалить список просмотренных товаров */
  const clearVisitedProducts = () => setLocalStorage(VISITED_PRODUCTS, '');

  return { clearVisitedProducts, setVisitedProduct, visitedProducts };
};
