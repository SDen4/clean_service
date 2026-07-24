import { SquareCheckBig } from 'lucide-react';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui';

interface IProps {
  item: { text: string; description?: string; icon?: React.ElementType };
}

/** Элемент текста списка услуг */
export const ServiceItem = ({ item }: IProps) => {
  if (!item) return '';

  const Icon = item.icon || SquareCheckBig;

  return (
    <Card className="relative min-h-[280px] min-w-[300px] w-[30%] justify-between group hover:(shadow-xl) hover:-translate-y-1 transition-all duration-[0.3s] bg-gradient-to-tl from-slate-100 to-slate-300">
      <CardHeader>
        <CardTitle className="z-[1] p-4 text-2xl text-sky-900 ">
          {item.text}
        </CardTitle>
      </CardHeader>

      <div>
        {!!item.description && (
          <CardDescription className="p-4">{item.description}</CardDescription>
        )}
        <CardFooter className="px-4 py-1">
          <p>Что сюда добавить?</p>
        </CardFooter>
      </div>

      <div className="absolute -bottom-12 -right-12">
        <Icon className="w-64 h-64 min-h-10 opacity-35 group-hover:opacity-10 transition-all duration-[0.3s] group-hover:translate-x-16 group-hover:translate-y-16" />
      </div>
    </Card>
  );
};
