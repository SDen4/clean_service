import type { ComponentProps } from 'react';
import { ImageOff } from 'lucide-react';

import type { IOffer } from '@/entities/catalog';

import { formatNumbers } from '@/shared/lib';
import { Link } from '@/shared/ui';

import { linkClassName } from '../../model/constants';

interface IProps extends Omit<ComponentProps<typeof Link>, 'to'> {
  product: IOffer;
  to?: string;
}

export const ProductCard = ({ product, to, ...props }: IProps) => {
  return (
    <Link
      className={`${linkClassName} max-w-[450px]`}
      {...props}
      to={to || product.id}
    >
      <div className="flex flex-col w-full items-center justify-between gap-3 p-2 bg-slate-100 dark:bg-slate-200 h-[stretch]">
        <div className="flex flex-col items-center w-full gap-3">
          <div className="flex justify-center items-center rounded-lg overflow-hidden">
            {product?.picture ? (
              <img loading="lazy" decoding="async" src={product.picture} />
            ) : (
              <ImageOff width="100%" height="auto" className="stroke-sky-200" />
            )}
          </div>

          <h6 className="dark:text-sky-950 text-center">
            {product.name}{' '}
            {!!product?.vendor && <>(Производитель: {product.vendor})</>}
          </h6>

          {product.available === false && (
            <span className="text-red-600"> Нет в наличии</span>
          )}

          {!!product?.vendorCode && (
            <span className="text-center">
              Артикул:&nbsp;{product.vendorCode}
            </span>
          )}
        </div>

        {product?.price ? (
          <span>{formatNumbers(product.price)}&nbsp;руб.</span>
        ) : null}
      </div>
    </Link>
  );
};
