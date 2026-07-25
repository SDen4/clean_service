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
export const Navigation = ({ className }: IProps) => (
  <NavigationMenu className={`${className}`}>
    <NavigationMenuList className="gap-4 items-start px-0">
      {navigationData
        .filter((el) => el.id !== ROUTES.MAIN)
        .map((el) => (
          <NavigationMenuItem key={el.id}>
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
