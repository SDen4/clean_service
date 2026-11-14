import { DeleteVisitedProductsButton } from '@/features/product/@x/visited-products';

import type { IOffer } from '@/entities/catalog';

import { useScrolled } from '@/shared/model';

interface IProps {
  /** Массив просмотренных карточек товара */
  visitedProducts: (IOffer | undefined)[];
  /** Поисковое значение */
  searchValue: string;
}

/** Заголовок списка товаров в каталоге */
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
