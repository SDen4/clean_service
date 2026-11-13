import { useMemo } from 'react';

import { useProducts } from '@/entities/catalog/@x/product';

import { setLocalStorage, useLocalStorage } from '@/shared/lib';

import { getProductIdFromPath } from '../../helpers/get-product-id-from-path';

/** Ключ localstorage для id просмотренных товаров */
export const VISITED_PRODUCTS = 'VISITED_PRODUCTS';

/** Максимальное кол-во элементов в просмотренных */
const MAX_VISITED_ITEMS = 12;

/** Запись в localstorage идентификаторов просмотренных товаров */
export const useVisitedProducts = () => {
  const { offers } = useProducts((store) => store);

  const visitedProductsPathsStr = useLocalStorage(VISITED_PRODUCTS);

  const visitedProductsPathsArr = useMemo(
    () =>
      visitedProductsPathsStr?.length ? visitedProductsPathsStr.split(',') : [],
    [visitedProductsPathsStr],
  );

  /** Список просмотренных товаров */
  const visitedProducts = useMemo(
    () =>
      visitedProductsPathsArr.map((path) => {
        const foundOffer = offers.find(
          (el) => String(el.id) === getProductIdFromPath(path),
        );

        if (!foundOffer) return undefined;

        return { ...foundOffer, bepUrl: path };
      }),
    [offers, visitedProductsPathsArr],
  );

  /** Добавить в список просмотренных товаров новый id товара */
  const setVisitedProduct = (pathName?: string) => {
    if (!pathName) return;

    // пустой список
    if (!visitedProductsPathsArr.length) {
      setLocalStorage(VISITED_PRODUCTS, pathName);
      return;
    }

    // дубль
    if (visitedProductsPathsArr.includes(pathName)) return;

    // максимальное кол-во в просмотренных
    if (visitedProductsPathsArr.length >= MAX_VISITED_ITEMS) {
      const res = visitedProductsPathsArr.concat();
      res.length = MAX_VISITED_ITEMS - 1;
      res.unshift(pathName);
      setLocalStorage(VISITED_PRODUCTS, res.join(','));
      return;
    }

    // валидный кейс добавления в список просмотренных
    setLocalStorage(VISITED_PRODUCTS, `${pathName},${visitedProductsPathsStr}`);
  };

  /** Удалить список просмотренных товаров */
  const clearVisitedProducts = () => setLocalStorage(VISITED_PRODUCTS, '');

  return { clearVisitedProducts, setVisitedProduct, visitedProducts };
};
