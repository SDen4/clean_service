import { createBrowserRouter } from 'react-router-dom';
import { Ban } from 'lucide-react';

import { ROUTES } from '@/shared/config';
import { ErrorBoundary } from '@/shared/ui';

import { MainLayout } from '../main-layout';
import { checkNumberUrl } from './checkNumberUrl';

import {
  AboutPageLazy,
  CatalogPageLazy,
  CatalogSearchPageLazy,
  CatalogWrapperPageLazy,
  ContactsPageLazy,
  ContactUsPageLazy,
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
          element: (
            <ErrorBoundary>
              <CatalogWrapperPageLazy />
            </ErrorBoundary>
          ),
          children: [
            {
              path: ROUTES.CATALOG,
              element: (
                <ErrorBoundary>
                  <CatalogPageLazy />
                </ErrorBoundary>
              ),
            },
            {
              path: ROUTES.CATALOG_SEARCH,
              element: (
                <ErrorBoundary>
                  <CatalogSearchPageLazy />
                </ErrorBoundary>
              ),
            },
          ],
        },
        {
          path: `${ROUTES.CATALOG}/:categoryId`,
          element: (
            <ErrorBoundary>
              <SubCategoryPageLazy />
            </ErrorBoundary>
          ),
          loader: checkNumberUrl,
          errorElement: <ErrorPageLazy />,
        },
        {
          path: `${ROUTES.CATALOG}/:categoryId/:subCategoryId`,
          element: (
            <ErrorBoundary>
              <ProductsListPageLazy />
            </ErrorBoundary>
          ),
          loader: checkNumberUrl,
          errorElement: <ErrorPageLazy />,
        },
        {
          path: `${ROUTES.CATALOG}/:categoryId/:subCategoryId/:productId`,
          element: (
            <ErrorBoundary>
              <ProductPageLazy />
            </ErrorBoundary>
          ),
          loader: checkNumberUrl,
          errorElement: <ErrorPageLazy />,
        },
        {
          path: ROUTES.PRIVACY_POLICY,
          element: (
            <ErrorBoundary>
              <PrivacyPolicyPageLazy />
            </ErrorBoundary>
          ),
        },
        {
          path: ROUTES.CONTACT_US,
          element: (
            <ErrorBoundary>
              <ContactUsPageLazy />
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
