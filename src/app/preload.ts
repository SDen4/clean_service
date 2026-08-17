import { registerPreloader } from '@/shared/lib';
import { PageKeys } from '@/shared/model';

// Регистрация пред загрузчиков
registerPreloader(PageKeys.main, () => import('@/pages/main'));
registerPreloader(PageKeys.contacts, () => import('@/pages/contacts'));
registerPreloader(PageKeys.about, () => import('@/pages/about'));
registerPreloader(PageKeys.services, () => import('@/pages/services'));
registerPreloader(PageKeys.error, () => import('@/pages/error'));
registerPreloader(
  PageKeys.privacyPolicy,
  () => import('@/pages/privacy-policy'),
);
