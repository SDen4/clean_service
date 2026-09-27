import type { ComponentType } from 'react';
import { lazy } from 'react';

import type { IErrorPageProps } from '@/pages/error';

import {
  aboutPageImport,
  catalogPageImport,
  contactsPageImport,
  errorPageImport,
  goodsListPageImport,
  mainPageImport,
  privacyPolicyPageImport,
  productPageImport,
  servicesPageImport,
  subCategoryPageImport,
} from '@/entities/page';

const MainPageLazy = lazy(mainPageImport);
const CatalogPageLazy = lazy(catalogPageImport);
const ContactsPageLazy = lazy(contactsPageImport);
const AboutPageLazy = lazy(aboutPageImport);
const ServicesPageLazy = lazy(servicesPageImport);
const ErrorPageLazy = lazy(errorPageImport) as React.LazyExoticComponent<
  ComponentType<IErrorPageProps>
>;
const SubCategoryPageLazy = lazy(subCategoryPageImport);
const GoodsListPageLazy = lazy(goodsListPageImport);
const PrivacyPolicyPageLazy = lazy(privacyPolicyPageImport);
const ProductPageLazy = lazy(productPageImport);

export {
  MainPageLazy,
  CatalogPageLazy,
  ContactsPageLazy,
  AboutPageLazy,
  ServicesPageLazy,
  ErrorPageLazy,
  PrivacyPolicyPageLazy,
  SubCategoryPageLazy,
  GoodsListPageLazy,
  ProductPageLazy,
};
