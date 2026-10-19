import { Phone, User } from 'lucide-react';

import type { TErrors, TInputItem, TValues } from '../types';

export const defaultValues: TValues = {
  name: '',
  phone: '',
  checkbox: false,
  checkboxAgreement: false,
};

export const defaultErrors: TErrors = {
  name: '',
  phone: '',
  checkbox: '',
  checkboxAgreement: '',
};

/** Идентификатор в localstorage для хранения времени ошибки отправки обратной связи */
export const storageKey = 'CALL_BACK_ERROR_TIME';

/** Дефолтное значение идентификатора storageKey */
export const emptyLocalstorageData = 'NONE';

const maxNameLength = 150;
const maxPhoneLength = 18;

export const inputsList: TInputItem[] = [
  {
    placeholder: 'Введите ФИО',
    label: 'ФИО *',
    type: 'text',
    inputMode: 'text',
    id: 'name',
    icon: User,
    maxLength: maxNameLength,
  },
  {
    placeholder: 'Введите телефон',
    label: 'Телефон *',
    type: 'tel',
    inputMode: 'tel',
    id: 'phone',
    icon: Phone,
    maxLength: maxPhoneLength, // валидная длина телефонного номера со всеми символами
  },
];
