import { DeleteVisitedProductsButton } from '@/features/product';

import { useScrolled } from '@/shared/model';

interface IProps {
  visitedProducts: unknown[];
  searchValue: string;
}

export const Title = ({ visitedProducts, searchValue }: IProps) => {
  const { isScrolled } = useScrolled();

  if (isScrolled) return null;

  return (
    <div className="flex items-end gap-3 pointer-events-auto">
      <h2>Вы смотрели</h2>
      {!!visitedProducts?.length && !searchValue && (
        <DeleteVisitedProductsButton />
      )}
    </div>
  );
};
