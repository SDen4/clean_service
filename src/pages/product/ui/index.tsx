import { useParams } from 'react-router-dom';
import { ImageOff } from 'lucide-react';

import { useGetCatalogData } from '@/entities/catalog';

import { formatNumbers } from '@/shared/lib';
import { ClipboardCopyWrapper, Loader, ZoomImage } from '@/shared/ui';

/** Страница товара от партнера */
const ProductPage = () => {
  const { productId } = useParams();

  const { offers, isLoading, isData, error } = useGetCatalogData();

  const product = offers.find((el) => String(el.id) === String(productId));

  const productParams = Object.entries(product?.params ?? {});

  return (
    <>
      {isLoading && !isData && !error ? (
        <Loader />
      ) : (
        <div className="flex flex-col w-full gap-10">
          <h2>
            <ClipboardCopyWrapper>{product?.name}</ClipboardCopyWrapper>{' '}
            {product?.available === false && (
              <span className="text-red-600"> Нет в наличии</span>
            )}
          </h2>

          <div className="flex flex-col items-center sm:items-start sm:flex-row gap-10">
            <div className="flex justify-center items-center min-w-96 w-96 h-96 rounded-xl overflow-auto border-[1px] border-gray-100">
              {product?.picture ? (
                <ZoomImage
                  src={product.picture}
                  alt="Product picture"
                  zoom={3}
                />
              ) : (
                <ImageOff className="w-48 h-48" />
              )}
            </div>

            <div className="flex flex-col gap-3">
              {product?.vendor ? (
                <div>
                  <span>Производитель</span>
                  <ClipboardCopyWrapper>
                    <h6>{product.vendor}</h6>
                  </ClipboardCopyWrapper>
                </div>
              ) : null}

              {product?.vendorCode ? (
                <div>
                  <span>Артикул</span>
                  <ClipboardCopyWrapper>
                    <h6>{product.vendorCode}</h6>
                  </ClipboardCopyWrapper>
                </div>
              ) : null}

              {product?.description ? (
                <div>
                  <span>Описание</span>
                  <h6>{product.description}</h6>
                </div>
              ) : null}

              {productParams.length ? (
                <div className="flex flex-col gap-1">
                  <span>Характеристики</span>
                  <div className="flex flex-col w-fit">
                    {productParams.map(([key, value]) => (
                      <div
                        className="flex items-center justify-between gap-3"
                        key={key}
                      >
                        <span>{key}: </span>
                        <h6>{value}</h6>
                      </div>
                    ))}
                  </div>
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
