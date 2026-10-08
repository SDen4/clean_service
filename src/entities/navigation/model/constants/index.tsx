import type { ReactNode } from 'react';
import {
  House,
  Info,
  Landmark,
  MessageSquareText,
  Search,
  ShoppingCart,
  UserSearch,
  Wrench,
} from 'lucide-react';

import type { ICategory } from '@/entities/catalog/@x/navigation';
import { contactUsPageImport } from '@/entities/page';
import {
  aboutPageImport,
  catalogSearchPageImport,
  catalogWrapperImport,
  contactsPageImport,
  mainPageImport,
  privacyPolicyPageImport,
  servicesPageImport,
} from '@/entities/page/@x/navigation';

import { ROUTES } from '@/shared/config';

interface INavigationData {
  title: string;
  route: ROUTES;
  id: ROUTES;
  icon: ReactNode;
  importFunc?: () => void;
  subCategories?: ICategory[];
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
  {
    title: 'Каталог',
    route: ROUTES.CATALOG,
    id: ROUTES.CATALOG,
    icon: <ShoppingCart />,
    importFunc: catalogWrapperImport,
  },
  {
    title: 'Обратная связь',
    route: ROUTES.CONTACT_US,
    id: ROUTES.CONTACT_US,
    icon: <MessageSquareText />,
    importFunc: contactUsPageImport,
  },
] as const;

export const breadcrumbData: INavigationData[] = [
  ...navigationData,
  {
    title: 'Политика конфиденциальности',
    route: ROUTES.PRIVACY_POLICY,
    id: ROUTES.PRIVACY_POLICY,
    icon: <Landmark />,
    importFunc: privacyPolicyPageImport,
  },
  {
    title: 'Каталог (поиск)',
    route: ROUTES.CATALOG_SEARCH,
    id: ROUTES.CATALOG_SEARCH,
    icon: <Search />,
    importFunc: catalogSearchPageImport,
  },
] as const;
