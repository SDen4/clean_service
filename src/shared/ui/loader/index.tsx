import type { HTMLAttributes } from 'react';
import { Loader as LoaderIcon } from 'lucide-react';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Loader = ({ className, ...props }: IProps) => (
  <div
    {...props}
    className={`flex flex-col items-center w-full gap-10 ${className}`}
  >
    <LoaderIcon className="animate-spin w-10 h-10" />
    <h4>Загрузка...</h4>
  </div>
);
