import { useNavigate } from 'react-router-dom';
import { ShoppingCart, TextSearch } from 'lucide-react';

import { ROUTES } from '@/shared/config';
import { Button } from '@/shared/ui';

export const VisitedProductsListFallback = () => {
  const navigate = useNavigate();

  const onClick = () => navigate(`/${ROUTES.CATALOG}`);

  return (
    <div className="flex flex-col justify-center items-center gap-3 flex-1">
      <TextSearch width={75} height={75} />
      <h3 className="text-center">Вы пока ничего не посмотрели</h3>
      <h6 className="text-center">
        На этой странице мы показываем последние просмотренные товары, чтобы вы
        могли быстро к ним вернуться
      </h6>

      <Button variant="outline" onClick={onClick}>
        <ShoppingCart />
        Перейти в каталог
      </Button>
    </div>
  );
};
