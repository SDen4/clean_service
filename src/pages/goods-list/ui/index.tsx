import { useParams } from 'react-router-dom';
import { ImageOff } from 'lucide-react';

import { GoodsListFallback, useGetCatalogData } from '@/entities/catalog';

import { formatNumbers } from '@/shared/lib';
import { Loader } from '@/shared/ui';

/** Список товаров от партнера */
const GoodsListPage = () => {
  const { subCategoryId } = useParams();

  const { offers, categories, isLoading, isData, error } = useGetCatalogData();

  const subCategoryName =
    categories.find((el) => String(el.id) === String(subCategoryId))?.name ||
    '';
  const filteredOffers = offers?.filter(
    (el) => String(el.categoryId) === String(subCategoryId),
  );

  if (!isData) return <GoodsListFallback />;

  return (
    <>
      <h2>{subCategoryName}</h2>

      {isLoading && !isData && !error ? (
        <Loader />
      ) : (
        <div className="flex flex-col w-full gap-1">
          {filteredOffers.map((el) => (
            <div
              key={el.id + el.name}
              className="flex items-center gap-3 w-full p-2 rounded-md bg-slate-100 dark:bg-slate-200"
            >
              <div className="flex justify-center items-center w-16 h-16">
                {el?.picture ? <img src={el.picture} /> : <ImageOff />}
              </div>

              <div className="flex flex-col w-full gap-1">
                <div className="flex w-full items-center justify-between gap-1">
                  <h6 className="dark:text-sky-950">
                    {el.name}{' '}
                    {!!el?.vendor && <>(Производитель: {el.vendor})</>}
                    {!!el?.vendorCode && <span> Артикул: {el.vendorCode}</span>}
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
          ))}
        </div>
      )}
    </>
  );
};

export default GoodsListPage;
