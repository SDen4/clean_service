import type { HTMLAttributes } from 'react';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
}

/** Стилевая обертка блока данных в футере */
export const FooterBlock = ({ text, ...rest }: IProps) => (
  <div
    {...rest}
    className={`flex flex-col gap-3 sm:min-w-0 min-w-[200px] ${rest.className}`}
  >
    <h4>{text}</h4>
    {rest.children}
  </div>
);
