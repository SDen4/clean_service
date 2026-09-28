import { type ReactNode, useRef } from 'react';
import { Copy, Info } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '../button';
import { Tooltip } from '../tooltip';

interface IProps {
  children: ReactNode;
}

/** Обертка для копирование текста в буфер обмена */
export const ClipboardCopyWrapper = ({ children }: IProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(ref.current?.innerText ?? '');
      toast(
        <>
          <span>
            <i>"{ref.current?.innerText}"</i>
          </span>{' '}
          скопировано в буфер обмена
        </>,
        {
          icon: <Info />,
        },
      );
    } catch (err) {
      toast(`Не удалось скопировать: ${err}`);
    }
  };

  return (
    <div ref={ref} className="flex gap-1">
      {children}

      <Tooltip text="Скопировать в буфер обмена">
        <Button
          onClick={onClick}
          className="bg-transparent hover:bg-transparent w-4 h-4"
        >
          <Copy />
        </Button>
      </Tooltip>
    </div>
  );
};
