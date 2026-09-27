import { useParams } from 'react-router-dom';
import { ImageOff } from 'lucide-react';

import { useGetCatalogData } from '@/entities/catalog';

import { formatNumbers } from '@/shared/lib';
import { Loader } from '@/shared/ui';

/** Страница товара от партнера */
const ProductPage = () => {
  const { productId } = useParams();

  const { offers, isLoading, isData, error } = useGetCatalogData();

  const product = offers.find((el) => String(el.id) === String(productId));

  return (
    <>
      {isLoading && !isData && !error ? (
        <Loader />
      ) : (
        <div className="flex flex-col w-full gap-10">
          <h2>
            {product?.name}{' '}
            {product?.available === false && (
              <span className="text-red-600"> Нет в наличии</span>
            )}
          </h2>

          <div className="flex gap-5">
            <div className="flex justify-center items-center min-w-96 w-96 h-96 rounded-xl overflow-auto">
              {product?.picture ? <img src={product.picture} /> : <ImageOff />}
            </div>

            <div className="flex flex-col gap-3">
              {product?.vendor ? (
                <div>
                  <span>Производитель</span>
                  <h6>{product.vendor}</h6>
                </div>
              ) : null}

              {product?.vendorCode ? (
                <div>
                  <span>Артикул</span>
                  <h6>{product.vendorCode}</h6>
                </div>
              ) : null}

              {product?.description ? (
                <div>
                  <span>Описание</span>
                  <h6>{product.description}</h6>
                </div>
              ) : null}

              {product?.price ? (
                <div>
                  <span>Цена</span>
                  <h6>{formatNumbers(product.price)} руб.</h6>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
