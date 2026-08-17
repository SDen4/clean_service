import type { ComponentType } from 'react';
import { lazy } from 'react';

import type { IErrorPageProps } from '@/pages/error';

import {
  aboutPageImport,
  contactsPageImport,
  errorPageImport,
  mainPageImport,
  privacyPolicyPageImport,
  servicesPageImport,
} from '@/entities/page';

const MainPageLazy = lazy(mainPageImport);
const ContactsPageLazy = lazy(contactsPageImport);
const AboutPageLazy = lazy(aboutPageImport);
const ServicesPageLazy = lazy(servicesPageImport);
const ErrorPageLazy = lazy(errorPageImport) as React.LazyExoticComponent<
  ComponentType<IErrorPageProps>
>;
const PrivacyPolicyPageLazy = lazy(privacyPolicyPageImport);

export {
  MainPageLazy,
  ContactsPageLazy,
  AboutPageLazy,
  ServicesPageLazy,
  ErrorPageLazy,
  PrivacyPolicyPageLazy,
};
