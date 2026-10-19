import type { LucideIcon } from 'lucide-react';

export type TValues = {
  name: string;
  phone: string;
  checkbox: boolean;
  checkboxAgreement: boolean;
};

export type TErrors = {
  name: string;
  phone: string;
  checkbox: string;
  checkboxAgreement: string;
};

type TInputIds = 'name' | 'phone';

export type TInputItem = {
  id: TInputIds;
  icon: LucideIcon;
  type: React.HTMLInputTypeAttribute;
  inputMode?: 'text' | 'tel';
  label: string;
  placeholder: string;
  maxLength: number;
  pattern?: string;
};
