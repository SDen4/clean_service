import { useOutletContext } from 'react-router-dom';

import { ProductCard } from '@/features/product';

import { EMPTY_PATH, useProducts } from '@/entities/catalog';

import { ScrollUpButton } from '@/shared/ui';

const CatalogSearch = () => {
  const { offers, categories } = useProducts();

  const searchValue = useOutletContext<string>();

  return (
    <>
      <div className="flex flex-col w-full gap-1">
        {offers
          .filter((offer) =>
            `${offer.name}_${offer.vendor}_${offer.description}_${offer.vendor}_${offer.vendorCode}`
              .toLowerCase()
              .includes(searchValue.toLowerCase()),
          )
          .map((el) => {
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
