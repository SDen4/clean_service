import { useState } from 'react';
import { useParams } from 'react-router-dom';

import type { TSortState } from '@/features/product';
import {
  PriceSortButton,
  Product,
  ProductListTypeButton,
} from '@/features/product';

import { ProductsListFallback, useGetCatalogData } from '@/entities/catalog';
import { ProductListWrapper } from '@/entities/product';
import { PriceInfoText } from '@/entities/text';

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

        <div className="flex flex-wrap gap-2 items-end">
          <PriceSortButton sort={sort} setSort={setSort} />
          <ProductListTypeButton />
        </div>
      </div>

      {isLoading && !isData && !error ? (
        <Loader />
      ) : (
        <ProductListWrapper>
          {filteredOffers.map((el) => (
            <Product product={el} key={el.id + el.name} />
          ))}
          <ScrollUpButton />
        </ProductListWrapper>
      )}

      <PriceInfoText className="mt-auto" />
    </>
  );
};

export default ProductsListPage;
