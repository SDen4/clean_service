import { Mail, Phone, User } from 'lucide-react';

import type { TInputItem } from '@/features/contact-us';

export const inputsList: TInputItem[] = [
  {
    placeholder: 'Введите ФИО',
    label: 'ФИО *',
    type: 'text',
    id: 'name',
    icon: User,
  },
  {
    placeholder: 'Введите телефон',
    label: 'Телефон *',
    type: 'tel',
    id: 'phone',
    icon: Phone,
  },
  {
    placeholder: 'Введите электронную почту',
    label: 'Электронная почта *',
    type: 'email',
    id: 'email',
    icon: Mail,
  },
];
