import type { LucideIcon } from 'lucide-react';

type TInputIds = 'name' | 'email' | 'phone';

export type TInputItem = {
  id: TInputIds;
  icon: LucideIcon;
  type: React.HTMLInputTypeAttribute;
  label: string;
  placeholder: string;
  maxLength: number;
  pattern?: string;
};
