import type { ComponentType } from 'react';
import { lazy } from 'react';

import type { IErrorPageProps } from '@/pages/error';

import {
  aboutPageImport,
  callBackPageImport,
  catalogPageImport,
  catalogSearchPageImport,
  catalogWrapperImport,
  contactsPageImport,
  contactUsPageImport,
  errorPageImport,
  mainPageImport,
  privacyPolicyPageImport,
  productPageImport,
  productsListPageImport,
  servicesPageImport,
  subCategoryPageImport,
  visitedProductsPageImport,
} from '@/entities/page';

const AboutPageLazy = lazy(aboutPageImport);
const CatalogPageLazy = lazy(catalogPageImport);
const CatalogSearchPageLazy = lazy(catalogSearchPageImport);
const CatalogWrapperPageLazy = lazy(catalogWrapperImport);
const ContactsPageLazy = lazy(contactsPageImport);
const ContactUsPageLazy = lazy(contactUsPageImport);
const ErrorPageLazy = lazy(errorPageImport) as React.LazyExoticComponent<
  ComponentType<IErrorPageProps>
>;
const MainPageLazy = lazy(mainPageImport);
const PrivacyPolicyPageLazy = lazy(privacyPolicyPageImport);
const ProductPageLazy = lazy(productPageImport);
const ProductsListPageLazy = lazy(productsListPageImport);
const ServicesPageLazy = lazy(servicesPageImport);
const SubCategoryPageLazy = lazy(subCategoryPageImport);
const CallBackPageLazy = lazy(callBackPageImport);
const VisitedProductsPageLazy = lazy(visitedProductsPageImport);

export {
  AboutPageLazy,
  CallBackPageLazy,
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
  VisitedProductsPageLazy,
};
