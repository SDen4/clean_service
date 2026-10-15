import { Mail, Phone, User } from 'lucide-react';

import type { TErrors, TInputItem, TValues } from '../types';

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

// общее кол-во символов на 1 сообщение в tg - 4096
const maxAvailableMessageLength = 3978;
const maxNameLength = 150;
const maxPhoneLength = 18;
const maxEmailLength = 150;
const otherTgSymbols = 60; // служебные символы в сообщении tg

export const maxMessageLength =
  maxAvailableMessageLength -
  maxNameLength -
  maxPhoneLength -
  maxEmailLength -
  otherTgSymbols;

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
  {
    placeholder: 'Введите электронную почту',
    label: 'Электронная почта *',
    type: 'email',
    inputMode: 'email',
    id: 'email',
    icon: Mail,
    maxLength: maxEmailLength,
    pattern:
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*@?[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*$",
  },
];
