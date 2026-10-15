import type { LucideIcon } from 'lucide-react';

export type TValues = {
  name: string;
  phone: string;
  email: string;
  message: string;
  checkbox: boolean;
};

export type TErrors = {
  name: string;
  phone: string;
  email: string;
  message: string;
  checkbox: string;
};

type TInputIds = 'name' | 'email' | 'phone';

export type TInputItem = {
  id: TInputIds;
  icon: LucideIcon;
  type: React.HTMLInputTypeAttribute;
  inputMode?: 'text' | 'tel' | 'email';
  label: string;
  placeholder: string;
  maxLength: number;
  pattern?: string;
};
