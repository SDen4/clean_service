import { useLocation } from 'react-router-dom';

import { navigationData } from '@/entities/navigation';

import { ROUTES } from '@/shared/config';
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

  return (
    <NavigationMenu className={`${className}`}>
      <NavigationMenuList className="gap-4 items-start px-0">
        {navigationData
          .filter((el) => el.id !== ROUTES.MAIN)
          .map((el) => (
            <NavigationMenuItem
              key={el.id}
              className={pathname?.includes(el.id) ? 'bg-muted rounded-md' : ''}
            >
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                render={<Link to={el.route} onMouseEnter={el.importFunc} />}
              >
                {el.icon}
                {el.title}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
