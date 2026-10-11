import { Mail, Phone, User } from 'lucide-react';

import type { TInputItem } from '@/features/contact-us';

export const inputsList: TInputItem[] = [
  {
    placeholder: 'Введите ФИО',
    label: 'ФИО *',
    type: 'text',
    inputMode: 'text',
    id: 'name',
    icon: User,
    maxLength: 100,
  },
  {
    placeholder: 'Введите телефон',
    label: 'Телефон *',
    type: 'tel',
    inputMode: 'tel',
    id: 'phone',
    icon: Phone,
    maxLength: 12,
    pattern: '^\\d+$',
  },
  {
    placeholder: 'Введите электронную почту',
    label: 'Электронная почта *',
    type: 'email',
    inputMode: 'email',
    id: 'email',
    icon: Mail,
    maxLength: 100,
    pattern:
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*@?[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*$",
  },
];
