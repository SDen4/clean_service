import { ROUTES } from '@/shared/config';

const productsListPageRegExp = new RegExp(/^\/catalog\/\d+\/\d+$/);
const productPageRegExp = new RegExp(/^\/catalog\/\d+\/\d+\/\d+$/);

/** Нужно ли сжимать меню навигации */
export const isShrunkPageHelper = (pathname?: string) => {
  if (!pathname) return false;

  return (
    (pathname.includes(ROUTES.CATALOG) ||
      pathname.includes(ROUTES.CATALOG_SEARCH) ||
      pathname.includes(ROUTES.VISITED_PRODUCTS) ||
      productsListPageRegExp.test(pathname)) &&
    !productPageRegExp.test(pathname)
  );
};
