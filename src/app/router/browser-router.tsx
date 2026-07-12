import { createBrowserRouter } from 'react-router-dom';

import { ROUTES } from '@/shared/config';

import { MainLayout } from '../main-layout';

import {
  AboutPageLazy,
  ContactsPageLazy,
  ErrorPageLazy,
  MainPageLazy,
  ServicesPageLazy,
} from './lazy-components-imports';

export const browserRouter = createBrowserRouter(
  [
    {
      element: <MainLayout />,
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
      ],
    },
    {
      path: '*',
      element: <ErrorPageLazy />,
    },
  ],
  {
    basename: ROUTES.MAIN,
  },
);
