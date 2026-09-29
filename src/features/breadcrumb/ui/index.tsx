import React from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronDownIcon, ShoppingBasket } from 'lucide-react';

import { EMPTY_PATH, useProducts } from '@/entities/catalog';
import { breadcrumbData } from '@/entities/navigation';
import { BlockWrapper } from '@/entities/page';

import { ROUTES } from '@/shared/config';
import {
  Breadcrumb as BreadcrumbLib,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Link,
} from '@/shared/ui';

const mainNavItem = breadcrumbData[0];

export function Breadcrumb() {
  const { pathname } = useLocation();

  const { categories, offers } = useProducts();

  // Don't show breadcrumb at the main page
  if (pathname === ROUTES.MAIN) return null;

  const navItems = pathname
    .split('/')
    .filter((el) => el && el !== EMPTY_PATH)
    .map((el, i, arr) => {
      const brItem = breadcrumbData.find((br) => br.id === el);

      if (brItem) return brItem;

      const category = categories.find((cat) => String(cat.id) === String(el));

      let title = category?.name || '';

      if (i === 3 || i === 2) {
        const offer = offers.find((offer) => String(offer.id) === el);
        if (offer?.name) title = offer?.name;
      }

      const parentId = category?.parentId;

      const subCategories = categories.filter(
        (cat) =>
          cat.parentId &&
          String(cat.parentId) === String(parentId) &&
          cat.id !== category?.id,
      );

      return {
        id: el,
        title,
        icon: <ShoppingBasket />,
        route: arr
          .slice(0, i + 1)
          .map(decodeURIComponent)
          .join('/'),
        importFunc: () => null,
        subCategories,
      };
    });

  if (!navItems.length) return null;

  return (
    <BlockWrapper>
      <BreadcrumbLib>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              render={
                <Link
                  className="flex items-center gap-1"
                  to={mainNavItem.route}
                  onMouseEnter={mainNavItem.importFunc}
                >
                  <div className="[&>svg]:w-3 [&>svg]:h-3">
                    {mainNavItem.icon}
                  </div>
                  {mainNavItem.title}
                </Link>
              }
            />
          </BreadcrumbItem>

          {navItems.map((el, i, arr) => (
            <React.Fragment key={el.id}>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                {i === arr.length - 1 ? (
                  el.subCategories?.length ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <button className="flex items-center gap-1">
                            {el.title}
                            <ChevronDownIcon
                              data-icon="inline-end"
                              className="size-3.5"
                            />
                          </button>
                        }
                      />
                      <DropdownMenuContent align="start">
                        <DropdownMenuGroup>
                          {el.subCategories.map((subCat) => (
                            <DropdownMenuItem
                              key={`${subCat.id}_${subCat.name}`}
                            >
                              <Link
                                to={`${el.route.replace(/\/[^/]+\/?$/, `/${subCat.id}`)}`}
                              >
                                {subCat.name}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <BreadcrumbPage>
                      <div className="flex items-center gap-1">
                        <div className="[&>svg]:w-3 [&>svg]:h-3">
                          {el?.icon}
                        </div>
                        {el?.title}
                      </div>
                    </BreadcrumbPage>
                  )
                ) : (
                  <BreadcrumbLink
                    render={
                      <Link
                        className="flex items-center gap-1"
                        to={el.route}
                        onMouseEnter={el?.importFunc}
                      >
                        <div className="[&>svg]:w-3 [&>svg]:h-3">{el.icon}</div>
                        {el.title}
                      </Link>
                    }
                  />
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </BreadcrumbLib>
    </BlockWrapper>
  );
}
