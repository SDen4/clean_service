import type { ReactNode } from 'react';

/** Стилевая обертка для иконок в бредкрамбсах */
export const IconWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="[&>svg]:w-3 [&>svg]:h-3">{children}</div>;
};
