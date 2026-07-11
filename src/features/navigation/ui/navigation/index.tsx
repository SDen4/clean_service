import { Link } from 'react-router-dom';

import { ROUTES } from '@/shared/config';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/shared/ui';

const navigationData = [
  { title: 'О компании', route: ROUTES.ABOUT, id: 'about' },
  { title: 'Контакты', route: ROUTES.CONTACTS, id: 'contacts' },
];

export const Navigation = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-4">
        {/* <NavigationMenuItem>
          <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink render={<Link to={ROUTES.CONTACTS} />}>
              CONTACTS
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem> */}

        {navigationData.map((el) => (
          <NavigationMenuItem key={el.id}>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              render={<Link to={el.route} />}
            >
              {el.title}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
