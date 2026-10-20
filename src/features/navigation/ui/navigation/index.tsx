import { useLocation } from 'react-router-dom';

import { navigationData } from '@/entities/navigation';

import { ROUTES } from '@/shared/config';
import { useScrolled } from '@/shared/model';
import {
  Link,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/shared/ui';

interface IProps {
  className?: string;
}

/** Навигация по сайту */
export const Navigation = ({ className }: IProps) => {
  const { pathname } = useLocation();
  const { isScrolled } = useScrolled();

  const isCatalog = pathname.includes(ROUTES.CATALOG_SEARCH);
  const isScroll = isCatalog && isScrolled;

  return (
    <NavigationMenu className={`${className}`}>
      <NavigationMenuList className="gap-2 items-start px-0">
        {navigationData
          .filter((el) => el.id !== ROUTES.MAIN)
          .map((el) => (
            <NavigationMenuItem
              key={el.id}
              className={pathname?.includes(el.id) ? 'bg-muted rounded-md' : ''}
            >
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} ${isScroll ? 'gap-0' : ''}`}
                render={<Link to={el.route} onMouseEnter={el.importFunc} />}
              >
                {el.icon}

                <p
                  style={{
                    display: 'inline-block',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    maxWidth: isScroll ? '0px' : '150px',
                    transition: 'max-width 200ms ease-out',
                  }}
                >
                  {el.title}
                </p>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
