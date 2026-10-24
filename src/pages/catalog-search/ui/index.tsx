import { useOutletContext } from 'react-router-dom';

import { Product } from '@/features/product';

import type { IOffer } from '@/entities/catalog';
import { EMPTY_PATH, SearchFallback, useProducts } from '@/entities/catalog';
import { ProductListWrapper } from '@/entities/product';
import { PriceInfoText } from '@/entities/text';

import { ScrollUpButton } from '@/shared/ui';

const CatalogSearch = () => {
  const { categories } = useProducts();

  const { foundOffers, searchValue } = useOutletContext<{
    foundOffers: IOffer[];
    searchValue: string;
  }>();

  if (!foundOffers?.length && !!searchValue) return <SearchFallback />;

  return (
    <>
      <ProductListWrapper>
        {foundOffers.map((el) => {
          const category =
            categories.find((cat) => String(cat.id) === String(el.categoryId))
              ?.parentId ?? EMPTY_PATH;

          return (
            <Product
              product={el}
              key={el.id + el.name}
              to={`/catalog/${category}/${el.categoryId}/${el.id}`}
            />
          );
        })}
      </ProductListWrapper>

      <PriceInfoText className="mt-auto" />

      <ScrollUpButton />
    </>
  );
};

export default CatalogSearch;
