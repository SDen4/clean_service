import { TriangleAlert } from 'lucide-react';

export const ProductsListFallback = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 flex-1">
      <TriangleAlert width={75} height={75} />
      <h3>Нет данных для отображения</h3>
    </div>
  );
};
