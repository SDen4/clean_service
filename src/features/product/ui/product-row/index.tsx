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

export const ProductRow = ({ product, to, ...props }: IProps) => {
  return (
    <Link className={linkClassName} {...props} to={to || product.id}>
      <div className="flex items-center gap-3 w-full p-2 rounded-md bg-slate-100 dark:bg-slate-200">
        <div className="flex justify-center items-center w-16 h-16">
          {product?.picture ? (
            <img loading="lazy" decoding="async" src={product.picture} />
          ) : (
            <ImageOff width="100%" height="100%" className="stroke-sky-200" />
          )}
        </div>

        <div className="flex flex-col w-full gap-2 min-w-0 flex-1">
          <div className="flex w-full items-center justify-between gap-1">
            <h6 className="dark:text-sky-950">
              {product.name}{' '}
              {!!product?.vendor && <>(Производитель: {product.vendor})</>}
              {!!product?.vendorCode && (
                <span> Артикул:&nbsp;{product.vendorCode}</span>
              )}
              {product.available === false && (
                <span className="text-red-600"> Нет в наличии</span>
              )}
            </h6>

            {product?.price ? (
              <span>{formatNumbers(product.price)}&nbsp;руб.</span>
            ) : null}
          </div>

          <span className="block min-w-0 truncate">{product.description}</span>
        </div>
      </div>
    </Link>
  );
};
