import { useMemo } from 'react';

import { useProducts } from '@/entities/catalog/@x/product';

import { setLocalStorage, useLocalStorage } from '@/shared/lib';

import { getProductIdFromPath } from '../../helpers/get-product-id-from-path';

/** Ключ localstorage для id просмотренных товаров */
export const VISITED_PRODUCTS = 'VISITED_PRODUCTS';

/** Максимальное кол-во элементов в просмотренных */
const MAX_VISITED_ITEMS = 10;

/** Запись в localstorage идентификаторов просмотренных товаров */
export const useVisitedProducts = () => {
  const { offers } = useProducts((store) => store);

  const visitedProductsPathsStr = useLocalStorage(VISITED_PRODUCTS);

  const visitedProductsPaths = useMemo(
    () =>
      visitedProductsPathsStr?.length ? visitedProductsPathsStr.split(',') : [],
    [visitedProductsPathsStr],
  );

  /** Список просмотренных товаров */
  const visitedProducts = useMemo(
    () =>
      visitedProductsPaths.map((path) => {
        const foundOffer = offers.find(
          (el) => String(el.id) === getProductIdFromPath(path),
        );

        if (!foundOffer) return undefined;

        return { ...foundOffer, bepUrl: path };
      }),
    [offers, visitedProductsPaths],
  );

  /** Добавить в список просмотренных товаров новый id товара */
  const setVisitedProduct = (pathname?: string) => {
    if (!pathname) return;

    // дубль
    if (visitedProductsPaths.includes(pathname)) return;

    // пустой список
    if (!visitedProductsPaths.length) {
      setLocalStorage(VISITED_PRODUCTS, pathname);
      return;
    }

    // максимальное кол-во в просмотренных
    if (visitedProductsPaths.length >= MAX_VISITED_ITEMS) {
      const res = visitedProductsPaths.concat();
      res.length = MAX_VISITED_ITEMS - 1;
      res.unshift(pathname);
      setLocalStorage(VISITED_PRODUCTS, res.join(','));
      return;
    }

    // валидный кейс добавления в список просмотренных
    setLocalStorage(VISITED_PRODUCTS, `${pathname},${visitedProductsPathsStr}`);
  };

  /** Удалить список просмотренных товаров */
  const clearVisitedProducts = () => setLocalStorage(VISITED_PRODUCTS, '');

  return { clearVisitedProducts, setVisitedProduct, visitedProducts };
};
