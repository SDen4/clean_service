import type { ComponentProps } from 'react';
import { ImageOff } from 'lucide-react';

import type { IOffer } from '@/entities/catalog';

import { formatNumbers } from '@/shared/lib';
import { Link } from '@/shared/ui';

interface IProps extends Omit<ComponentProps<typeof Link>, 'to'> {
  product: IOffer;
  to?: string;
}

export const ProductCard = ({ product, to, ...props }: IProps) => {
  return (
    <Link
      className="[content-visibility:auto] [contain-intrinsic-size:auto_80px]"
      {...props}
      to={to || product.id}
    >
      <div className="flex items-center gap-3 w-full p-2 rounded-md bg-slate-100 dark:bg-slate-200">
        <div className="flex justify-center items-center w-16 h-16">
          {product?.picture ? (
            <img loading="lazy" decoding="async" src={product.picture} />
          ) : (
            <ImageOff />
          )}
        </div>

        <div className="flex flex-col w-full gap-1">
          <div className="flex w-full items-center justify-between gap-1">
            <h6 className="dark:text-sky-950">
              {product.name}{' '}
              {!!product?.vendor && <>(Производитель: {product.vendor})</>}
              {!!product?.vendorCode && (
                <span> Артикул: {product.vendorCode}</span>
              )}
              {product.available === false && (
                <span className="text-red-600"> Нет в наличии</span>
              )}
            </h6>

            {product?.price ? (
              <span>{formatNumbers(product.price)} руб.</span>
            ) : null}
          </div>

          <span>{product.description}</span>
        </div>
      </div>
    </Link>
  );
};
