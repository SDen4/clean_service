import type { IOffer } from '@/entities/catalog';

/** Генерация пред заполненного текста - Вопрос по товару */
export const createMessageText = (product?: IOffer) => {
  return `Добрый день!
Интересует ${product?.name} (${product?.vendor}, арт: ${product?.vendorCode}, цена: ${product?.price} руб.)`;
};
