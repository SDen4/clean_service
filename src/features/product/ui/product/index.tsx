import type { ComponentProps } from 'react';

import type { IOffer } from '@/entities/catalog';
import { PRODUCT_LIST_TYPE, productListTypes } from '@/entities/product';

import { useLocalStorage } from '@/shared/lib';
import type { Link } from '@/shared/ui';

import { ProductCard } from '../product-card';
import { ProductRow } from '../product-row';

interface IProps extends Omit<ComponentProps<typeof Link>, 'to'> {
  product: IOffer;
  to?: string;
}

/** Элемент списка товаров */
export const Product = ({ ...props }: IProps) => {
  const listType = useLocalStorage(PRODUCT_LIST_TYPE, '');
  const isCard = listType === productListTypes.card;

  const ProductComponent = isCard ? ProductCard : ProductRow;

  return <ProductComponent {...props} />;
};
