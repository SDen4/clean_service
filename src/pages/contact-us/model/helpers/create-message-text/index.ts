import type { IOffer } from '@/entities/catalog';

/** Генерация пред заполненного текста - Вопрос по товару */
export const createMessageText = (state?: IOffer) => {
  return `Добрый день!
Интересует ${state?.name} (${state?.vendor}, арт: ${state?.vendorCode}, цена: ${state?.price} руб.)`;
};
