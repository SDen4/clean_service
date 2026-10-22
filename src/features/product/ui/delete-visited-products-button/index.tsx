import { Trash } from 'lucide-react';

import { useVisitedProducts } from '@/entities/product';

import { Button, Tooltip } from '@/shared/ui';

export const DeleteVisitedProductsButton = () => {
  const { clearVisitedProducts } = useVisitedProducts();

  const onClick = () => clearVisitedProducts();

  return (
    <Tooltip text="Удалить историю просмотра" side="right">
      <Button variant="outline" onClick={onClick} className="px-2">
        <Trash />
      </Button>
    </Tooltip>
  );
};
