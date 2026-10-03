import { useOutletContext } from 'react-router-dom';

import { ProductCard } from '@/features/product';

import type { IOffer } from '@/entities/catalog';
import { EMPTY_PATH, useProducts } from '@/entities/catalog';

import { ScrollUpButton } from '@/shared/ui';

const CatalogSearch = () => {
  const { categories } = useProducts();

  const foundOffers = useOutletContext<IOffer[]>();

  return (
    <>
      <div className="flex flex-col w-full gap-1">
        {foundOffers.map((el) => {
          const category =
            categories.find((cat) => String(cat.id) === String(el.categoryId))
              ?.parentId ?? EMPTY_PATH;

          return (
            <ProductCard
              product={el}
              key={el.id + el.name}
              to={`/catalog/${category}/${el.categoryId}/${el.id}`}
            />
          );
        })}
      </div>

      <ScrollUpButton />
    </>
  );
};

export default CatalogSearch;
