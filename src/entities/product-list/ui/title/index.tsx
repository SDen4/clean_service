import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import type { ICategory, IOffer } from '@/entities/catalog/@x/product-list';

import { useScrolled } from '@/shared/model';

interface IProps {
  categoryOffers: IOffer[];
  categories: ICategory[];
}

export const Title = ({ categoryOffers, categories }: IProps) => {
  const { subCategoryId } = useParams();
  const { isScrolled } = useScrolled();

  const subCategoryName = useMemo(
    () =>
      categories.find((el) => String(el.id) === String(subCategoryId))?.name ||
      '',
    [categories, subCategoryId],
  );

  if (isScrolled) return null;

  return (
    <h2>
      {subCategoryName}{' '}
      {categoryOffers?.length ? `(${categoryOffers.length}\u00a0шт.)` : ''}
    </h2>
  );
};
