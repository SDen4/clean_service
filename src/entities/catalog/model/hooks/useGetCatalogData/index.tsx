import { useEffect, useState } from 'react';
import { TriangleAlert } from 'lucide-react';
import { toast } from 'sonner';

import { normalizeCategory } from '../../helpers/normalize-category';
import { normalizeOffer } from '../../helpers/normalize-offer';
import { toArray } from '../../helpers/to-array';
import { useProducts } from '../../store/use-products';
import type { IRawYmlCatalog } from '../../types';

import { XMLParser } from 'fast-xml-parser';

const feedUrl = 'https://bep-remont.duckdns.org/yandex';

const parser = new XMLParser({
  ignoreAttributes: false,
  parseAttributeValue: true, // string to number
  attributeNamePrefix: '@_',
  textNodeName: '#text',
  trimValues: true,
});

export const useGetCatalogData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { categories, offers, setData, isData } = useProducts((store) => store);

  useEffect(() => {
    const controller = new AbortController();

    if (isData) return;

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
        const newOffers = rawOffers.map(normalizeOffer);
        const newCategories = rawCategories.map(normalizeCategory);

        setData({ offers: newOffers, categories: newCategories });
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
  }, [isData, setData]);

  return { categories, offers, isLoading, isData, error };
};
