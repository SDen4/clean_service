import { useState } from 'react';
import { useParams } from 'react-router-dom';

import type { TSortState } from '@/features/product';
import { PriceSortButton, ProductCard } from '@/features/product';

import { ProductsListFallback, useGetCatalogData } from '@/entities/catalog';

import { Loader, ScrollUpButton } from '@/shared/ui';

/** Список товаров от партнера */
const ProductsListPage = () => {
  const { subCategoryId } = useParams();

  const { offers, categories, isLoading, isData, error } = useGetCatalogData();

  const subCategoryName =
    categories.find((el) => String(el.id) === String(subCategoryId))?.name ||
    '';

  const [sort, setSort] = useState<TSortState>('none');
  const filteredOffers = offers
    ?.filter((el) => String(el.categoryId) === String(subCategoryId))
    .sort((a, b) => {
      if (sort !== 'none') {
        if (sort === 'asc') {
          return a.price > b.price ? 1 : -1;
        } else {
          return b.price > a.price ? 1 : -1;
        }
      }
      return 0;
    });

  if (!isData || !filteredOffers?.length) return <ProductsListFallback />;

  return (
    <>
      <div className="flex w-full items-end justify-between gap-2">
        <h2>
          {subCategoryName}{' '}
          {filteredOffers?.length ? `(${filteredOffers.length}\u00a0шт.)` : ''}
        </h2>
        <PriceSortButton sort={sort} setSort={setSort} />
      </div>

      {isLoading && !isData && !error ? (
        <Loader />
      ) : (
        <div className="flex flex-col w-full gap-1">
          {filteredOffers.map((el) => (
            <ProductCard product={el} key={el.id + el.name} />
          ))}
          <ScrollUpButton />
        </div>
      )}
    </>
  );
};

export default ProductsListPage;
