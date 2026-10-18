import type { HTMLAttributes, ReactNode } from 'react';

import { useLocalStorage } from '@/shared/lib';

import { PRODUCT_LIST_TYPE, productListTypes } from '../../model/constants';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/** Обертка списка товаров */
export const ProductListWrapper = ({ children }: IProps) => {
  const listType = useLocalStorage(PRODUCT_LIST_TYPE, '');
  const isCard = listType === productListTypes.card;

  const rowStyles = 'flex flex-col gap-3';
  const cardStyles =
    'grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-3';

  return (
    <div className={`w-full ${isCard ? cardStyles : rowStyles}  `}>
      {children}
    </div>
  );
};
