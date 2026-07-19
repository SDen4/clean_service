import type { HTMLAttributes, ReactNode } from 'react';
import { TriangleAlert } from 'lucide-react';

import logo from '../../assets/logoCompressed.png';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  /** Контент страницы */
  children: ReactNode;
  /** Иконка страницы на фоне лого */
  icon?: React.ElementType;
}

/** Стилизованная обертка для страницы ошибки и error boundary */
export const ErrorPageWrapper = ({ children, icon, ...rest }: IProps) => {
  const Icon = icon ?? TriangleAlert;

  return (
    <div
      {...rest}
      className={`flex flex-col gap-16 justify-center items-center w-full h-[90vh] ${rest.className}`}
    >
      <div className="relative -mt-48">
        <img src={logo} alt="логотип" className="w-60 h-40 blur-sm" />
        <Icon className="stroke-orange-500 size-24 absolute top-24 left-[70px]" />
      </div>

      <div className="flex flex-col justify-center items-center gap-10">
        {children}
      </div>
    </div>
  );
};
