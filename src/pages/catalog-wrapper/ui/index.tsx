import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { PackageSearch, Search, X } from 'lucide-react';

import type { TSortState } from '@/features/product';
import { PriceSortButton, ProductListTypeButton } from '@/features/product';

import { useProducts } from '@/entities/catalog';
import { catalogSearchPageImport } from '@/entities/page';

import { ROUTES } from '@/shared/config';
import { Badge, Button, Input } from '@/shared/ui';

const CatalogWrapper = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { offers } = useProducts();

  const [searchValue, setSearchValue] = useState('');
  const [sort, setSort] = useState<TSortState>('none');

  const isSearchPage = pathname.includes('catalog-search');

  useEffect(() => {
    if (searchValue && !isSearchPage) {
      navigate(ROUTES.CATALOG_SEARCH);
    }
    if (!searchValue && isSearchPage) {
      navigate(ROUTES.CATALOG);
    }
  }, [navigate, isSearchPage, searchValue]);

  const onFocus = () => catalogSearchPageImport();
  const onReset = () => setSearchValue('');
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const foundOffers = offers
    .filter((offer) =>
      `${offer.name}_${offer.vendor}_${offer.description}_${offer.vendor}_${offer.vendorCode}`
        .toLowerCase()
        .includes(searchValue.toLowerCase()),
    )
    .sort((a, b) => {
      if (sort !== 'none') {
        if (sort === 'asc') {
          return a.price > b.price ? 1 : -1;
        } else {
          return b.price > a.price ? 1 : -1;
        }
      }
      return 0;
    });

  return (
    <>
      <div className="flex w-full items-end justify-between flex-wrap gap-2 sticky top-[70px] sm:top-[60px] lg:top-[80px] z-40 pointer-events-none">
        <div
          className="sticky top-20 
            overflow-hidden
            animate-collapse 
            [animation-timeline:scroll(root)] 
            [animation-range:0_75px]
            "
        >
          <h2 className="hidden md:block">
            Каталог {isSearchPage && '(поиск)'}
          </h2>
        </div>

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
              value={searchValue}
              onChange={onChange}
              onFocus={onFocus}
              className="px-10 w-56"
              placeholder="Поиск товаров"
            />

            {!!searchValue && (
              <Button
                variant="ghost"
                onClick={onReset}
                className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-transparent"
              >
                <X />
              </Button>
            )}
          </div>

          {!!searchValue && (
            <>
              <PriceSortButton sort={sort} setSort={setSort} />
              <ProductListTypeButton />
            </>
          )}
        </div>
      </div>

      <Outlet context={{ foundOffers, searchValue }} />
    </>
  );
};

export default CatalogWrapper;
