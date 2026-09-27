/** Элемент каталога товаров партнера */
export interface ICategory {
  id: number;
  parentId: number | null; // у корневых категорий parentId нет
  name: string;
}

/** Элемент товара партнера */
export interface IOffer {
  id: string;
  available: boolean;
  price: number;
  currencyId: string;
  categoryId: number;
  picture: string;
  vendor: string;
  vendorCode: string;
  name: string;
  description: string;
  url: string;
  /** Все <param name="...">...</param> в виде словаря: { "Цвет": "Серый", "Модель": "LSU135" } */
  params: Record<string, string>;
}
