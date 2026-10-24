import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PackageSearch, Search } from 'lucide-react';

import { VisitedProducts } from '@/widgets/visited-products';

import type { TSortState } from '@/features/product';
import {
  PriceSortButton,
  Product,
  ProductListTypeButton,
  sortProductsByPrice,
} from '@/features/product';

import { SearchFallback, useGetCatalogData } from '@/entities/catalog';
import { catalogSearchPageImport } from '@/entities/page';
import { ProductListWrapper } from '@/entities/product';
import { PriceInfoText } from '@/entities/text';

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

/** Список товаров от партнера */
const ProductsListPage = () => {
  const { subCategoryId } = useParams();
  const { isScrolled } = useScrolled();

  const { offers, categories, isLoading, isData, error } = useGetCatalogData();

  const subCategoryName =
    categories.find((el) => String(el.id) === String(subCategoryId))?.name ||
    '';

  const [searchValue, setSearchValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [sort, setSort] = useState<TSortState>('none');

  const onFocus = () => catalogSearchPageImport();

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

  const categoryOffers = offers.filter(
    (el) => String(el.categoryId) === String(subCategoryId),
  );

  const foundOffers = categoryOffers
    .filter((offer) =>
      `${offer.name}_${offer.vendor}_${offer.description}_${offer.vendor}_${offer.vendorCode}`
        .toLowerCase()
        .includes(searchValue.toLowerCase()),
    )
    .sort(sortProductsByPrice(sort));

  return (
    <>
      <div className="flex w-full items-end justify-between flex-wrap gap-2 sticky top-[70px] sm:top-[60px] lg:top-[80px] z-40 pointer-events-none">
        {!isScrolled && (
          <h2>
            {subCategoryName}{' '}
            {categoryOffers?.length
              ? `(${categoryOffers.length}\u00a0шт.)`
              : ''}
          </h2>
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
              onFocus={onFocus}
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
          {foundOffers.map((el) => (
            <Product product={el} key={el.id + el.name} />
          ))}
          <ScrollUpButton />
        </ProductListWrapper>
      )}

      {!isLoading && (!isData || !foundOffers?.length) && <SearchFallback />}

      <VisitedProducts />

      <PriceInfoText className="mt-auto" />
    </>
  );
};

export default ProductsListPage;
