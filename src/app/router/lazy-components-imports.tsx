import { lazy } from 'react';

import {
  aboutPageImport,
  contactsPageImport,
  errorPageImport,
  mainPageImport,
  servicesPageImport,
} from '@/entities/page';

const MainPageLazy = lazy(mainPageImport);
const ContactsPageLazy = lazy(contactsPageImport);
const AboutPageLazy = lazy(aboutPageImport);
const ServicesPageLazy = lazy(servicesPageImport);
const ErrorPageLazy = lazy(errorPageImport);

export {
  MainPageLazy,
  ContactsPageLazy,
  AboutPageLazy,
  ServicesPageLazy,
  ErrorPageLazy,
};
