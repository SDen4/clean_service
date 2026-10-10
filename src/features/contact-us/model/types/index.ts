import type { LucideIcon } from 'lucide-react';

type TInputIds = 'name' | 'email' | 'phone';

export type TInputItem = {
  id: TInputIds;
  icon: LucideIcon;
  type: React.HTMLInputTypeAttribute;
  label: string;
  placeholder: string;
};

export type TInputValues = Record<TInputIds, string> & {
  message: string;
  checkbox: string;
};

export type TInputErrors = Record<TInputIds, string> & {
  message: string;
  checkbox: string;
};

export type TFormState = {
  errors?: TInputErrors;
  success?: boolean;
  values?: TInputValues;
};
