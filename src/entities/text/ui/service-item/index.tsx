import { SquareCheckBig } from 'lucide-react';

/** Элемент текста списка услуг */
export const ServiceItem = ({ text }: { text?: string }) => {
  if (!text) return '';

  return (
    <div className="flex items-center gap-2">
      <SquareCheckBig />
      <h4>{text}</h4>
    </div>
  );
};
