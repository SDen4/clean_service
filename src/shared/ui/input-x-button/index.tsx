import { X } from 'lucide-react';
import type { BaseUIEvent, ButtonProps } from '@base-ui/react';

import { Button } from '../button';

interface IProps extends ButtonProps {
  /** Хендлер */
  onClick?: (
    event: BaseUIEvent<React.MouseEvent<HTMLButtonElement, MouseEvent>>,
  ) => void;
  /** Состояние дизейбла */
  isDisabled?: boolean;
}

/** Кнопка "Х" в инпуте */
export const InputXButton = ({ onClick, isDisabled, ...props }: IProps) => (
  <Button
    variant="ghost"
    onClick={onClick}
    disabled={isDisabled}
    {...props}
    className={`absolute right-[1px] top-1/2 -translate-y-1/2 hover:bg-transparent outline-none border-0 rounded-tl-none rounded-bl-none focus:bg-sky-200 ${props?.className}`}
  >
    <X />
  </Button>
);
