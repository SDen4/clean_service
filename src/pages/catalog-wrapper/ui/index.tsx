import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';

import { catalogSearchPageImport } from '@/entities/page';

import { Button, Input } from '@/shared/ui';

const CatalogWrapper = () => {
  const [searchValue, setSearchValue] = useState('');

  const navigate = useNavigate();
  const { pathname } = useLocation();

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

  return (
    <>
      <div className="flex w-full items-end justify-between">
        <h2>Каталог {isSearchPage && '(поиск)'}</h2>

        <div className="relative min-w-[300px] w-[30%]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            value={searchValue}
            onChange={onChange}
            onFocus={onFocus}
            className="pr-10 pl-10"
            placeholder="Поиск товаров по каталогу"
          />
          <Button
            variant="ghost"
            onClick={onReset}
            className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-transparent"
          >
            <X />
          </Button>
        </div>
      </div>

      <Outlet context={searchValue} />
    </>
  );
};

export default CatalogWrapper;
