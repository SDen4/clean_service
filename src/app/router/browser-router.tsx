import { createBrowserRouter } from 'react-router-dom';

import { MainPage } from '@/pages/main-page';

import { ROUTES } from '@/shared/config';

import { MainLayout } from '../main-layout';

export const browserRouter = createBrowserRouter(
  [
    {
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: <MainPage />,
        },
        {
          path: ROUTES.ABOUT,
          element: <div>About page</div>,
        },
        {
          path: ROUTES.CONTACTS,
          element: <div>Contacts page</div>,
        },
      ],
    },
    {
      path: '*',
      element: <div>Error page</div>,
    },
  ],
  {
    basename: '/',
  },
);
