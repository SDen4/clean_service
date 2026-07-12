import type { ReactNode } from 'react';
import { House, Info, UserSearch, Wrench } from 'lucide-react';

import {
  aboutPageImport,
  contactsPageImport,
  mainPageImport,
  servicesPageImport,
} from '@/entities/page';

import { ROUTES } from '@/shared/config';

interface INavigationData {
  title: string;
  route: ROUTES;
  id: ROUTES;
  icon: ReactNode;
  importFunc?: () => void;
}

export const navigationData: INavigationData[] = [
  {
    title: 'Главная',
    route: ROUTES.MAIN,
    id: ROUTES.MAIN,
    icon: <House />,
    importFunc: mainPageImport,
  },
  {
    title: 'О компании',
    route: ROUTES.ABOUT,
    id: ROUTES.ABOUT,
    icon: <Info />,
    importFunc: aboutPageImport,
  },
  {
    title: 'Услуги',
    route: ROUTES.SERVICES,
    id: ROUTES.SERVICES,
    icon: <Wrench />,
    importFunc: servicesPageImport,
  },
  {
    title: 'Контакты',
    route: ROUTES.CONTACTS,
    id: ROUTES.CONTACTS,
    icon: <UserSearch />,
    importFunc: contactsPageImport,
  },
] as const;
