import { SearchX } from 'lucide-react';

/** Заглушка для пустого результата поиска товаров */
export const SearchFallback = () => (
  <div className="flex flex-col justify-center items-center gap-3 flex-1">
    <SearchX width={75} height={75} />
    <h3>По вашему запросу ничего не найдено</h3>
  </div>
);
