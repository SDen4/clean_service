import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { PackageSearch, Search, X } from 'lucide-react';

import { useProducts } from '@/entities/catalog';
import { catalogSearchPageImport } from '@/entities/page';

import { Badge, Button, Input } from '@/shared/ui';

const CatalogWrapper = () => {
  const [searchValue, setSearchValue] = useState('');

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { offers } = useProducts();

  const isSearchPage = pathname.includes('catalog-search');

  useEffect(() => {
    if (searchValue && !isSearchPage) {
      navigate('catalog-search');
    }
    if (!searchValue && isSearchPage) {
      navigate('catalog');
    }
  }, [navigate, isSearchPage, searchValue]);

  const onFocus = () => catalogSearchPageImport();
  const onReset = () => setSearchValue('');
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const foundOffers = offers.filter((offer) =>
    `${offer.name}_${offer.vendor}_${offer.description}_${offer.vendor}_${offer.vendorCode}`
      .toLowerCase()
      .includes(searchValue.toLowerCase()),
  );

  return (
    <>
      <div className="flex w-full items-end justify-between flex-wrap gap-3">
        <h2>Каталог {isSearchPage && '(поиск)'}</h2>

        <div className="flex items-center justify-end flex-wrap gap-3 w-[65%]">
          {!!searchValue && (
            <Badge className="rounded-md px-2 py-4" variant="secondary">
              <PackageSearch data-icon="inline-start" />
              Найдено: <b>{foundOffers.length}</b>
            </Badge>
          )}

          <div className="relative min-w-[300px] w-[46%]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              value={searchValue}
              onChange={onChange}
              onFocus={onFocus}
              className="pr-10 pl-10"
              placeholder="Поиск товаров по каталогу"
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
        </div>
      </div>

      <Outlet context={foundOffers} />
    </>
  );
};

export default CatalogWrapper;
