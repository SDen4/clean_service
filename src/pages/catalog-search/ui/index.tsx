import { useOutletContext } from 'react-router-dom';
import { SearchX } from 'lucide-react';

import { ProductCard } from '@/features/product';

import type { IOffer } from '@/entities/catalog';
import { EMPTY_PATH, useProducts } from '@/entities/catalog';

import { ScrollUpButton } from '@/shared/ui';

const CatalogSearch = () => {
  const { categories } = useProducts();

  const { foundOffers, searchValue } = useOutletContext<{
    foundOffers: IOffer[];
    searchValue: string;
  }>();

  if (!foundOffers?.length && !!searchValue) {
    return (
      <div className="flex flex-col justify-center items-center gap-3 flex-1">
        <SearchX width={75} height={75} />
        <h3>По вашему запросу ничего не найдено</h3>
      </div>
    );
  }

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
