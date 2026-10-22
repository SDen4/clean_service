import { DeleteVisitedProductsButton } from '@/features/product';

import { useVisitedProducts, VisitedProduct } from '@/entities/product';

export const VisitedProducts = () => {
  const { visitedProducts } = useVisitedProducts();

  if (!visitedProducts?.length) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-end gap-3">
        <h2>Вы смотрели</h2>

        <DeleteVisitedProductsButton />
      </div>

      <div className="max-w-full overflow-x-scroll">
        <div className="flex w-max gap-3">
          {visitedProducts.map((el) => (
            <VisitedProduct key={`${el?.id}_${el?.name}`} product={el} />
          ))}
        </div>
      </div>
    </div>
  );
};
