import { useLocation } from 'react-router-dom';

import { navigationData } from '@/entities/navigation';
import { BlockWrapper } from '@/entities/page';

import { ROUTES } from '@/shared/config';
import {
  Breadcrumb as BreadcrumbLib,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Link,
} from '@/shared/ui';

const mainNavItem = navigationData[0];

export function Breadcrumb() {
  const { pathname } = useLocation();

  // Don't show breadcrumb at the main page
  if (pathname === ROUTES.MAIN) return null;

  const navItem = navigationData.find((el) => el.id === pathname.slice(1));

  if (!navItem) return null;

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

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>
              <div className="flex items-center gap-1">
                <div className="[&>svg]:w-3 [&>svg]:h-3">{navItem?.icon}</div>
                {navItem?.title}
              </div>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </BreadcrumbLib>
    </BlockWrapper>
  );
}
