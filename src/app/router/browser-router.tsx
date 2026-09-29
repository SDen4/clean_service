import { createBrowserRouter } from 'react-router-dom';
import { Ban } from 'lucide-react';

import { ROUTES } from '@/shared/config';
import { ErrorBoundary } from '@/shared/ui';

import { MainLayout } from '../main-layout';

import {
  AboutPageLazy,
  CatalogPageLazy,
  ContactsPageLazy,
  ErrorPageLazy,
  MainPageLazy,
  PrivacyPolicyPageLazy,
  ProductPageLazy,
  ProductsListPageLazy,
  ServicesPageLazy,
  SubCategoryPageLazy,
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
          element: (
            <ErrorBoundary>
              <MainPageLazy />
            </ErrorBoundary>
          ),
        },
        {
          path: ROUTES.ABOUT,
          element: (
            <ErrorBoundary>
              <AboutPageLazy />
            </ErrorBoundary>
          ),
        },
        {
          path: ROUTES.SERVICES,
          element: (
            <ErrorBoundary>
              <ServicesPageLazy />
            </ErrorBoundary>
          ),
        },
        {
          path: ROUTES.CONTACTS,
          element: (
            <ErrorBoundary>
              <ContactsPageLazy />
            </ErrorBoundary>
          ),
        },
        {
          path: ROUTES.CATALOG,
          element: (
            <ErrorBoundary>
              <CatalogPageLazy />
            </ErrorBoundary>
          ),
        },
        {
          path: `${ROUTES.CATALOG}/:categoryId`,
          element: (
            <ErrorBoundary>
              <SubCategoryPageLazy />
            </ErrorBoundary>
          ),
        },
        {
          path: `${ROUTES.CATALOG}/:categoryId/:subCategoryId`,
          element: (
            <ErrorBoundary>
              <ProductsListPageLazy />
            </ErrorBoundary>
          ),
        },
        {
          path: `${ROUTES.CATALOG}/:categoryId/:subCategoryId/:productId`,
          element: (
            <ErrorBoundary>
              <ProductPageLazy />
            </ErrorBoundary>
          ),
        },
        {
          path: ROUTES.PRIVACY_POLICY,
          element: (
            <ErrorBoundary>
              <PrivacyPolicyPageLazy />
            </ErrorBoundary>
          ),
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
