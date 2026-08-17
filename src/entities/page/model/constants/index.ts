import { getPreloader } from '@/shared/lib';
import { PageKeys } from '@/shared/model';

export const mainPageImport = () => getPreloader(PageKeys.main)();
export const contactsPageImport = () => getPreloader(PageKeys.contacts)();
export const aboutPageImport = () => getPreloader(PageKeys.about)();
export const servicesPageImport = () => getPreloader(PageKeys.services)();
export const errorPageImport = () => getPreloader(PageKeys.error)();
export const privacyPolicyPageImport = () =>
  getPreloader(PageKeys.privacyPolicy)();
