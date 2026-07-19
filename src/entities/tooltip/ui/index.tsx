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
      <TooltipTrigger render={children} />
      <TooltipContent side={side}>
        <p>{text}</p>
      </TooltipContent>
    </TooltipLib>
  );
}
