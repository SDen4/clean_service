import type { ICategory, IOffer } from '../../types';

import type { StoreApi, UseBoundStore } from 'zustand';
import { create } from 'zustand';

export const useGoods: UseBoundStore<
  StoreApi<{
    isData: boolean;
    offers: IOffer[];
    categories: ICategory[];
    setData: ({
      offers,
      categories,
    }: {
      offers: IOffer[];
      categories: ICategory[];
    }) => void;
  }>
> = create((set) => ({
  isData: false,
  offers: [],
  categories: [],
  setData: ({ offers, categories }) =>
    set((state) => ({
      ...state,
      offers,
      categories,
      isData: offers?.length > 0,
    })),
}));
