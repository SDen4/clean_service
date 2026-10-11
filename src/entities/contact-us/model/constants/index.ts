import type { TErrors, TValues } from '../types';

export const defaultValues: TValues = {
  name: '',
  phone: '',
  email: '',
  message: '',
  checkbox: false,
};

export const defaultErrors: TErrors = {
  name: '',
  phone: '',
  email: '',
  message: '',
  checkbox: '',
};

/** Идентификатор в localstorage для хранения времени ошибки отправки обратной связи */
export const storageKey = 'REQUEST_ERROR_TIME';
/** Дефолтное значение идентификатора storageKey */
export const emptyLocalstorageData = 'NONE';
