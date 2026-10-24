import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ImageOff } from 'lucide-react';

import { ImageDialog, ProductQuestionButton } from '@/features/product';

import { useGetCatalogData } from '@/entities/catalog';
import { useVisitedProducts } from '@/entities/product';
import { PriceInfoText } from '@/entities/text';

import { formatNumbers } from '@/shared/lib';
import { ClipboardCopyWrapper, Loader } from '@/shared/ui';

/** Страница товара от партнера */
const ProductPage = () => {
  const { productId } = useParams();
  const { pathname } = useLocation();

  const { offers, isLoading, isData, error } = useGetCatalogData();
  const { setVisitedProduct } = useVisitedProducts();

  const product = offers.find((el) => String(el.id) === String(productId));

  const productParams = Object.entries(product?.params ?? {});

  useEffect(() => {
    setVisitedProduct(pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

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
            <div className="flex justify-center items-center sm:min-w-80 lg:min-w-96 sm:w-80 lg:w-96 rounded-xl overflow-auto">
              {product?.picture ? (
                <ImageDialog src={product.picture} />
              ) : (
                <ImageOff className="stroke-sky-200" width="80%" height="80%" />
              )}
            </div>

            <div className="flex flex-col gap-3 w-full">
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

              <div className="flex justify-between flex-wrap items-end w-full gap-2">
                {product?.price ? (
                  <div>
                    <span>Цена</span>
                    <h6>{formatNumbers(product.price)}&nbsp;руб.</h6>
                  </div>
                ) : null}

                <ProductQuestionButton product={product} />
              </div>
            </div>
          </div>

          <PriceInfoText />
        </div>
      )}
    </>
  );
};

export default ProductPage;
