import { createBrowserRouter } from 'react-router-dom';
import { Ban } from 'lucide-react';

import { ROUTES } from '@/shared/config';

import { MainLayout } from '../main-layout';

import {
  AboutPageLazy,
  ContactsPageLazy,
  ErrorPageLazy,
  MainPageLazy,
  PrivacyPolicyPageLazy,
  ServicesPageLazy,
} from './lazy-components-imports';

export const browserRouter = createBrowserRouter(
  [
    {
      element: <MainLayout />,
      errorElement: (
        <ErrorPageLazy
          title="Ошибка приложения"
          text="Что-то пошло не так..."
          icon={Ban}
        />
      ),
      children: [
        {
          path: ROUTES.MAIN,
          element: <MainPageLazy />,
        },
        {
          path: ROUTES.ABOUT,
          element: <AboutPageLazy />,
        },
        {
          path: ROUTES.SERVICES,
          element: <ServicesPageLazy />,
        },
        {
          path: ROUTES.CONTACTS,
          element: <ContactsPageLazy />,
        },
        {
          path: ROUTES.PRIVACY_POLICY,
          element: <PrivacyPolicyPageLazy />,
        },
      ],
    },
    {
      path: '*',
      element: <ErrorPageLazy />,
    },
  ],
  {
    basename: '/clean_service/',
  },
);
