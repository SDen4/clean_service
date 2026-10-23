import { ImageOff } from 'lucide-react';

import type { IOffer } from '@/entities/catalog';

import { formatNumbers } from '@/shared/lib';
import { Link } from '@/shared/ui';

interface IProps {
  product?: IOffer;
}

export const VisitedProduct = ({ product }: IProps) => {
  if (!product) return null;

  return (
    <Link
      className="flex flex-col items-center justify-between max-w-56 gap-2 p-2 rounded-md hover:shadow-lg transition-shadow duration-500 bg-slate-100 dark:bg-slate-200 h-[stretch]"
      to={product?.id}
    >
      <div className="flex flex-col gap-2 items-center h-[stretch] justify-between">
        <h6 className="text-center text-sm dark:text-sky-950">
          {product?.name}
        </h6>

        {!!product?.vendorCode && (
          <span className="text-center text-xs">
            Артикул:&nbsp;{product.vendorCode}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 items-center">
        <div className="flex justify-center items-center rounded-lg overflow-hidden bg-background w-full">
          {product?.picture ? (
            <img loading="lazy" decoding="async" src={product.picture} />
          ) : (
            <ImageOff
              width="100%"
              height="100%"
              className="stroke-sky-200 min-h-full"
            />
          )}
        </div>

        {product?.price ? (
          <span className="text-xs">{formatNumbers(product.price)} руб.</span>
        ) : null}
      </div>
    </Link>
  );
};
