import { useEffect } from 'react';

import { CatalogItem, GoodsListFallback, useGoods } from '@/entities/catalog';

import { Loader } from '@/shared/ui';

import { useGetCatalogData } from '../model/hooks/useGetCatalogData';

/** Каталоги товаров от партнера */
const CatalogPage = () => {
  const {
    setData,
    categories: categoriesStore,
    isData,
  } = useGoods((state) => state);

  const { categories, offers, isLoading, error } = useGetCatalogData({
    isStopRequest: isData,
  });

  useEffect(() => {
    if (!isData) setData({ categories, offers });
  }, [setData, categories, offers, isData]);

  return (
    <>
      <h2>Каталог</h2>

      {!!error && <GoodsListFallback />}

      {isLoading && !isData && !error ? (
        <Loader />
      ) : (
        <div className="flex justify-between flex-wrap w-full gap-10">
          {categoriesStore
            .filter((el) => !el.parentId)
            .map((el) => (
              <CatalogItem item={el} key={el.id} />
            ))}
        </div>
      )}
    </>
  );
};

export default CatalogPage;
