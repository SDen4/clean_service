import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ImageOff } from 'lucide-react';

import type { TSortState } from '@/features/product';
import { PriceSortButton } from '@/features/product';

import { ProductsListFallback, useGetCatalogData } from '@/entities/catalog';

import { formatNumbers } from '@/shared/lib';
import { Link, Loader } from '@/shared/ui';

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
          {filteredOffers?.length ? `(${filteredOffers.length} шт.)` : ''}
        </h2>
        <PriceSortButton sort={sort} setSort={setSort} />
      </div>

      {isLoading && !isData && !error ? (
        <Loader />
      ) : (
        <div className="flex flex-col w-full gap-1">
          {filteredOffers.map((el) => (
            <Link
              to={el.id}
              key={el.id + el.name}
              className="[content-visibility:auto] [contain-intrinsic-size:auto_80px]"
            >
              <div className="flex items-center gap-3 w-full p-2 rounded-md bg-slate-100 dark:bg-slate-200">
                <div className="flex justify-center items-center w-16 h-16">
                  {el?.picture ? (
                    <img loading="lazy" decoding="async" src={el.picture} />
                  ) : (
                    <ImageOff />
                  )}
                </div>

                <div className="flex flex-col w-full gap-1">
                  <div className="flex w-full items-center justify-between gap-1">
                    <h6 className="dark:text-sky-950">
                      {el.name}{' '}
                      {!!el?.vendor && <>(Производитель: {el.vendor})</>}
                      {!!el?.vendorCode && (
                        <span> Артикул: {el.vendorCode}</span>
                      )}
                      {el.available === false && (
                        <span className="text-red-600"> Нет в наличии</span>
                      )}
                    </h6>

                    {el?.price ? (
                      <span>{formatNumbers(el.price)} руб.</span>
                    ) : null}
                  </div>

                  <span>{el.description}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default ProductsListPage;
