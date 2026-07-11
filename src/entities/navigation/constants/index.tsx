import { House, Info, UserSearch } from 'lucide-react';

import { ROUTES } from '@/shared/config';

export const navigationData = [
  { title: 'Главная', route: '/', id: 'main', icon: <House /> },
  { title: 'О компании', route: ROUTES.ABOUT, id: 'about', icon: <Info /> },
  {
    title: 'Контакты',
    route: ROUTES.CONTACTS,
    id: 'contacts',
    icon: <UserSearch />,
  },
] as const;
