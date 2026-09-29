import type { HTMLAttributes, ReactNode } from 'react';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/** Стилизованная обертка для header и footer */
export const BlockWrapper = ({ children, ...rest }: IProps) => (
  <div
    {...rest}
    className={`flex flex-col justify-between gap-y-2 max-w-screen-xl w-full px-2 ${rest.className}`}
  >
    {children}
  </div>
);
