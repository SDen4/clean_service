import { SquareCheckBig } from 'lucide-react';

interface IProps {
  item: { text: string; icon?: React.ElementType };
}

/** Элемент текста списка услуг */
export const ServiceItem = ({ item }: IProps) => {
  if (!item) return '';

  const Icon = item.icon || SquareCheckBig;

  return (
    <div className="flex gap-3">
      <Icon className="pt-1 w-10 h-10 min-h-10 min-w-10" />
      <h2 className="text-2xl sm:text-4xl text-sky-900 dark:text-blue-100">
        {item.text}
      </h2>
    </div>
  );
};
