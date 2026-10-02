import {
  CatalogItem,
  ProductsListFallback,
  useGetCatalogData,
} from '@/entities/catalog';

import { Loader } from '@/shared/ui';

/** Каталог товаров от партнера */
const CatalogPage = () => {
  const { categories, isLoading, isData, error } = useGetCatalogData();

  return (
    <>
      {!!error && <ProductsListFallback />}

      {isLoading && !isData && !error ? (
        <Loader />
      ) : (
        <div className="flex justify-center lg:justify-between flex-wrap w-full gap-10">
          {categories
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
