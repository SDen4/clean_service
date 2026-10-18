import { Grid2X2, Rows3 } from 'lucide-react';

import { PRODUCT_LIST_TYPE, productListTypes } from '@/entities/product';

import { setLocalStorage, useLocalStorage } from '@/shared/lib';
import { Button } from '@/shared/ui';

export const ProductListTypeButton = () => {
  const listType = useLocalStorage(PRODUCT_LIST_TYPE, '');
  const isCard = listType === productListTypes.card;

  const onClick = () => {
    setLocalStorage(
      PRODUCT_LIST_TYPE,
      isCard ? productListTypes.row : productListTypes.card,
    );
  };

  return (
    <Button variant="outline" onClick={onClick} className="px-[7px]">
      {isCard ? <Grid2X2 /> : <Rows3 />}
    </Button>
  );
};
