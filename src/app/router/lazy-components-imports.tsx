import { lazy } from 'react';

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
const ErrorPageLazy = lazy(errorPageImport);
const PrivacyPolicyPageLazy = lazy(privacyPolicyPageImport);

export {
  MainPageLazy,
  ContactsPageLazy,
  AboutPageLazy,
  ServicesPageLazy,
  ErrorPageLazy,
  PrivacyPolicyPageLazy,
};
