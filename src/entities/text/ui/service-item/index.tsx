import { SquareCheckBig } from 'lucide-react';

/** Элемент текста списка услуг */
export const ServiceItem = ({ text }: { text?: string }) => {
  if (!text) return '';

  return (
    <div className="flex gap-2">
      <SquareCheckBig className="pt-1 w-6 h-6 min-h-6 min-w-6" />
      <h4>{text}</h4>
    </div>
  );
};
