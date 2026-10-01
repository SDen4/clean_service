import type { LoaderFunctionArgs } from 'react-router-dom';

import { EMPTY_PATH } from '@/entities/catalog';

const NUMERIC_PARAM_KEYS = [
  'categoryId',
  'subCategoryId',
  'productId',
] as const;

type NumericParamKey = (typeof NUMERIC_PARAM_KEYS)[number];
type NumericParams = Partial<Record<NumericParamKey, number>>;

export const checkNumberUrl = ({
  params,
}: LoaderFunctionArgs): NumericParams => {
  const result: NumericParams = {};

  for (const key of NUMERIC_PARAM_KEYS) {
    const raw = params[key];
    // eslint-disable-next-line no-continue
    if (raw === undefined || raw === EMPTY_PATH) continue; // параметра нет в этом маршруте — пропускаем

    if (!/^\d+$/.test(raw)) {
      throw new Response('Not Found', { status: 404 });
    }
    result[key] = Number(raw);
  }

  return result;
};
