import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PackageSearch, Search } from 'lucide-react';

import {
  DeleteVisitedProductsButton,
  PriceSortButton,
  Product,
  ProductListTypeButton,
  sortProductsByPrice,
  type TSortState,
} from '@/features/product';

import { SearchFallback, useGetCatalogData } from '@/entities/catalog';
import { ProductListWrapper, useVisitedProducts } from '@/entities/product';
import { PriceInfoText } from '@/entities/text';

import { ROUTES } from '@/shared/config';
import { useScrolled } from '@/shared/model';
import {
  Badge,
  Input,
  InputXButton,
  Loader,
  ScrollUpButton,
} from '@/shared/ui';

let timer: number | undefined;
const debounceTime = 300; // ms

const VisitedProducts = () => {
  const navigate = useNavigate();

  const { isScrolled } = useScrolled();
  const { isLoading, isData, error } = useGetCatalogData();
  const { visitedProducts } = useVisitedProducts();

  const [searchValue, setSearchValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [sort, setSort] = useState<TSortState>('none');

  const onReset = () => {
    setSearchValue('');
    setInputValue('');
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setInputValue(value);
    clearTimeout(timer);
    timer = setTimeout(() => setSearchValue(value), debounceTime);
  };

  const foundOffers = visitedProducts
    .filter((offer) =>
      `${offer?.name}_${offer?.vendor}_${offer?.description}_${offer?.vendor}_${offer?.vendorCode}`
        .toLowerCase()
        .includes(searchValue.toLowerCase()),
    )
    .sort(sortProductsByPrice(sort));

  useEffect(() => {
    if (!visitedProducts?.length) navigate(`/${ROUTES.CATALOG}`);
  }, [navigate, visitedProducts]);

  return (
    <>
      <div className="flex w-full items-end justify-between flex-wrap gap-2 sticky top-[70px] sm:top-[60px] lg:top-[80px] z-40 pointer-events-none">
        {!isScrolled && (
          <div className="flex items-end gap-3 pointer-events-auto">
            <h2>Вы смотрели</h2>
            <DeleteVisitedProductsButton />
          </div>
        )}

        <div className="flex items-center justify-end flex-wrap gap-2 rounded-md pointer-events-auto bg-background ml-auto p-2 -mr-2 lg:p-0 lg:mr-0">
          {!!searchValue && (
            <Badge className="rounded-md px-2 py-4" variant="secondary">
              <PackageSearch data-icon="inline-start" />
              Найдено: <b>{foundOffers.length}</b>
            </Badge>
          )}

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={inputValue}
              onChange={onChange}
              className="px-10 w-56"
              placeholder="Поиск товаров"
            />

            {!!searchValue && <InputXButton onClick={onReset} />}
          </div>

          <PriceSortButton sort={sort} setSort={setSort} />
          <ProductListTypeButton />
        </div>
      </div>

      {isLoading && !isData && !error ? (
        <Loader />
      ) : (
        <ProductListWrapper>
          {foundOffers.map((el) => {
            if (!el) return null;

            return (
              <Product
                product={el}
                key={`${el?.id}_${el?.name}`}
                to={el.bepUrl}
              />
            );
          })}
          <ScrollUpButton />
        </ProductListWrapper>
      )}

      {!foundOffers?.length && !isLoading && <SearchFallback />}

      <PriceInfoText className="mt-auto" />
    </>
  );
};

export default VisitedProducts;
