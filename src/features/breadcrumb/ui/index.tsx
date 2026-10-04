import React from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronDownIcon, List, ShoppingBasket } from 'lucide-react';

import { IconWrapper } from '@/entities/breadcrumb';
import { useProducts } from '@/entities/catalog';
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

  const navItems = pathname.split('/').map((el, i, arr) => {
    const brItem = breadcrumbData.find((br) => br.id === el);

    if (brItem) return brItem;

    const category = categories.find((cat) => String(cat.id) === String(el));

    let title = category?.name || '';

    if (i === 3 || i === 4) {
      const offer = offers.find((offer) => String(offer.id) === el);
      if (offer?.name) title = offer?.name;
    }

    const subCategories = categories.filter(
      (cat) =>
        cat.parentId && String(cat.parentId) === String(category?.parentId),
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

          {navItems
            .filter((el) => !!el.title)
            .map((el, i, arr) => (
              <React.Fragment key={el.id}>
                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  {i === arr.length - 1 ? (
                    el.subCategories?.length ? (
                      <DropdownMenu>
                        <IconWrapper>
                          <List />
                        </IconWrapper>

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
                                {String(el.id) === String(subCat.id) ? (
                                  <span className="text-slate-300">
                                    {subCat.name}
                                  </span>
                                ) : (
                                  <Link
                                    to={`${el.route.replace(/\/[^/]+\/?$/, `/${subCat.id}`)}`}
                                  >
                                    {subCat.name}
                                  </Link>
                                )}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <BreadcrumbPage>
                        <div className="flex items-center gap-1">
                          <IconWrapper>{el?.icon}</IconWrapper>
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
                          <IconWrapper>{el.icon}</IconWrapper>
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
