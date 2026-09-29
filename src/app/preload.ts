import { registerPreloader } from '@/shared/lib';
import { PageKeys } from '@/shared/model';

// Регистрация пред загрузчиков
registerPreloader(PageKeys.main, () => import('@/pages/main'));
registerPreloader(PageKeys.catalog, () => import('@/pages/catalog'));
registerPreloader(PageKeys.subCategory, () => import('@/pages/sub-category'));
registerPreloader(PageKeys.productsList, () => import('@/pages/products-list'));
registerPreloader(PageKeys.product, () => import('@/pages/product'));
registerPreloader(PageKeys.contacts, () => import('@/pages/contacts'));
registerPreloader(PageKeys.about, () => import('@/pages/about'));
registerPreloader(PageKeys.services, () => import('@/pages/services'));
registerPreloader(PageKeys.error, () => import('@/pages/error'));
registerPreloader(
  PageKeys.privacyPolicy,
  () => import('@/pages/privacy-policy'),
);
