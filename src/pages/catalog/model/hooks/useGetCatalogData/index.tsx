import { useEffect, useState } from 'react';
import { TriangleAlert } from 'lucide-react';
import { toast } from 'sonner';

import type { ICategory, IOffer } from '@/entities/catalog';

import type {
  IRawCategory,
  IRawOffer,
  IRawParam,
  IRawYmlCatalog,
} from '../../types';

import { XMLParser } from 'fast-xml-parser';

const feedUrl = 'https://bep-remont.duckdns.org/yandex';

// Вынести в отдельный хелпер + добавить юнит-тест
/** Приводит одиночный элемент к массиву (fast-xml-parser так не делает сам) */
const toArray = <T,>(value: T | T[] | undefined): T[] =>
  value === undefined ? [] : Array.isArray(value) ? value : [value];

/** Из <param name="X">Y</param> делает { X: "Y" } */
const paramsToRecord = (
  raw?: IRawParam | IRawParam[],
): Record<string, string> => {
  const result: Record<string, string> = {};
  for (const p of toArray(raw)) {
    const key = p['@_name'];
    // eslint-disable-next-line no-continue
    if (!key) continue;
    const value = p['#text'];
    result[key] = value === undefined || value === null ? '' : String(value);
  }
  return result;
};

const normalizeOffer = (raw: IRawOffer): IOffer => ({
  id: String(raw['@_id']),
  available: raw['@_available'] === true || raw['@_available'] === 'true',
  price: Number(raw.price ?? 0),
  currencyId: raw.currencyId ?? 'RUB',
  categoryId: raw.categoryId,
  picture: raw.picture ?? '',
  vendor: raw.vendor ?? '',
  vendorCode: raw.vendorCode !== undefined ? String(raw.vendorCode) : '',
  name: raw.name ?? '',
  description: raw.description ?? '',
  url: raw.url ?? '',
  params: paramsToRecord(raw.param),
});

const normalizeCategory = (raw: IRawCategory): ICategory => ({
  id: raw['@_id'],
  parentId: raw['@_parentId'] ?? null,
  name: raw['#text'] !== undefined ? String(raw['#text']) : '',
});

const parser = new XMLParser({
  ignoreAttributes: false,
  parseAttributeValue: true, // string to number
  attributeNamePrefix: '@_',
  textNodeName: '#text',
  trimValues: true,
});

interface IProps {
  isStopRequest?: boolean;
}

export const useGetCatalogData = ({ isStopRequest }: IProps) => {
  const [offers, setOffers] = useState<IOffer[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    if (isStopRequest) return;

    (async () => {
      try {
        const response = await fetch(feedUrl, {
          headers: { Accept: 'application/xml,text/xml,*/*' },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const xmlText = await response.text();

        const parsed = parser.parse(xmlText) as IRawYmlCatalog;
        const rawOffers = toArray(parsed?.yml_catalog?.shop?.offers?.offer);
        const rawCategories = toArray(
          parsed?.yml_catalog?.shop?.categories?.category,
        );

        setOffers(rawOffers.map(normalizeOffer));
        setCategories(rawCategories.map(normalizeCategory));
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;

        toast(`Ошибка загрузки данных: ${err}`, { icon: <TriangleAlert /> });

        setError(
          err instanceof Error ? err.message : 'Не удалось загрузить фид',
        );
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    })();

    return () => controller.abort();
  }, [isStopRequest]);

  return { categories, offers, isLoading, error };
};
