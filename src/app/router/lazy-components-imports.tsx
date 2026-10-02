import type { ComponentType } from 'react';
import { lazy } from 'react';

import type { IErrorPageProps } from '@/pages/error';

import {
  aboutPageImport,
  catalogPageImport,
  catalogSearchPageImport,
  catalogWrapperImport,
  contactsPageImport,
  errorPageImport,
  mainPageImport,
  privacyPolicyPageImport,
  productPageImport,
  productsListPageImport,
  servicesPageImport,
  subCategoryPageImport,
} from '@/entities/page';

const MainPageLazy = lazy(mainPageImport);
const CatalogPageLazy = lazy(catalogPageImport);
const CatalogWrapperPageLazy = lazy(catalogWrapperImport);
const CatalogSearchPageLazy = lazy(catalogSearchPageImport);
const ContactsPageLazy = lazy(contactsPageImport);
const AboutPageLazy = lazy(aboutPageImport);
const ServicesPageLazy = lazy(servicesPageImport);
const ErrorPageLazy = lazy(errorPageImport) as React.LazyExoticComponent<
  ComponentType<IErrorPageProps>
>;
const SubCategoryPageLazy = lazy(subCategoryPageImport);
const ProductsListPageLazy = lazy(productsListPageImport);
const PrivacyPolicyPageLazy = lazy(privacyPolicyPageImport);
const ProductPageLazy = lazy(productPageImport);

export {
  MainPageLazy,
  CatalogPageLazy,
  CatalogSearchPageLazy,
  CatalogWrapperPageLazy,
  ContactsPageLazy,
  AboutPageLazy,
  ServicesPageLazy,
  ErrorPageLazy,
  PrivacyPolicyPageLazy,
  SubCategoryPageLazy,
  ProductsListPageLazy,
  ProductPageLazy,
};
