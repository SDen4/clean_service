import { Link } from 'react-router-dom';

import { navigationData } from '@/entities/navigation';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/shared/ui';

/** Навигация по сайту */
export const Navigation = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-4 items-start">
        {/* <NavigationMenuItem>
          <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink render={<Link to={ROUTES.CONTACTS} />}>
              CONTACTS
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem> */}

        {navigationData
          .filter((el) => el.id !== 'main')
          .map((el) => (
            <NavigationMenuItem key={el.id}>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                render={<Link to={el.route} />}
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
