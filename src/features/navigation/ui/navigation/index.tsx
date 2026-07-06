// import { Link } from 'react-router-dom';

import { Link } from 'react-router-dom';

import { ROUTES } from '@/shared/config';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/shared/ui';

export const Navigation = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>
              <Link to={ROUTES.CONTACTS}>CONTACTS</Link>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      {/* 
      <NavigationMenuItem>
        <NavigationMenuLink
          className={navigationMenuTriggerStyle()}
          // render={<Link href="/docs">Docs</Link>}
        />
      </NavigationMenuItem> */}
    </NavigationMenu>
  );
};
