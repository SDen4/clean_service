import { ShoppingCart } from 'lucide-react';

import { Card, CardHeader, CardTitle, Link } from '@/shared/ui';

import { useProducts } from '../../model/store/use-products';
import type { ICategory } from '../../model/types';

import { EMPTY_PATH } from '../../model/constants';

interface IProps {
  item: ICategory;
}

/** Элемент списка категорий каталога */
export const CatalogItem = ({ item }: IProps) => {
  const { categories } = useProducts((state) => state);

  if (!item) return '';

  const subCategories = categories.filter(
    (el) => el.parentId && item.id === el.parentId,
  );

  const isNoSubCategories = !subCategories?.length;

  return (
    <Card className="relative min-h-[200px] min-w-[300px] w-[30%] group hover:(shadow-xl) hover:-translate-y-1 transition-all duration-[0.3s] bg-gradient-to-tl from-slate-100 to-slate-300">
      <CardHeader>
        <Link
          to={isNoSubCategories ? `${EMPTY_PATH}/${item.id}` : String(item.id)}
        >
          <CardTitle className="z-[1] p-4 text-2xl dark:text-sky-950">
            {item.name}
          </CardTitle>
        </Link>
      </CardHeader>

      <ul className="z-10">
        {subCategories.map((el) => (
          <li key={el.id + String(el?.parentId)}>
            <Link to={`${item.id}/${el.id}`} className="dark:text-sky-950">
              {el.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="absolute -right-5 -bottom-5">
        <ShoppingCart className="w-40 h-40 opacity-35 group-hover:opacity-10 transition-all duration-[0.3s] group-hover:translate-x-16 group-hover:translate-y-16" />
      </div>
    </Card>
  );
};
