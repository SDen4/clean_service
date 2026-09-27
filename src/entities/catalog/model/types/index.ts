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

/** Промежуточный тип — как fast-xml-parser отдаёт данные до нормализации */
export interface IRawParam {
  '@_name': string;
  '#text'?: string | number;
}

export interface IRawCategory {
  '@_id': number;
  '@_parentId'?: number; // ← опционально, иначе TS будет ругаться на корневые категории
  '#text'?: string | number; // ← текст названия приходит именно сюда
}

export interface IRawOffer {
  '@_id': string | number;
  '@_available': boolean | string;
  url?: string;
  price?: number | string;
  currencyId?: string;
  categoryId: number;
  picture?: string;
  vendor?: string;
  vendorCode?: string | number;
  name?: string;
  description?: string;
  param?: IRawParam | IRawParam[];
}

export interface IRawYmlCatalog {
  yml_catalog?: {
    shop?: {
      offers?: {
        offer?: IRawOffer | IRawOffer[];
      };
      categories?: {
        category?: IRawCategory[];
      };
    };
  };
}
