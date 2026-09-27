import { TriangleAlert } from 'lucide-react';

export const GoodsListFallback = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 flex-1">
      <TriangleAlert width={75} height={75} />
      <h2>Нет данных для отображения</h2>
    </div>
  );
};
