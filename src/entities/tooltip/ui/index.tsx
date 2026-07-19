import type { ReactElement } from 'react';

import type { TooltipPrimitive } from '@/shared/ui';
import {
  Tooltip as TooltipLib,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/ui';

interface IProps {
  /** TooltipTrigger */
  children: ReactElement;
  /** Текст тултипа */
  text?: string;
  /** Положение тултипа */
  side?: TooltipPrimitive.Positioner.Props['side'];
}

/** Тултип */
export function Tooltip({ children, text, side }: IProps) {
  if (!text) return children;

  return (
    <TooltipLib>
      {/* render={<div />} решает баг с ошибкой вложенной кнопки в shadcn */}
      <TooltipTrigger render={<div />}>{children}</TooltipTrigger>
      <TooltipContent side={side}>
        <p>{text}</p>
      </TooltipContent>
    </TooltipLib>
  );
}
