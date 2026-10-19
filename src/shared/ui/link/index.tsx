import type { ComponentProps, MouseEvent } from 'react';
import { Link as LinkReactRouterDom } from 'react-router-dom';

/** Link с добавленным обработчиком onClick для скролла страницы вверх */
export const Link = ({
  ...rest
}: ComponentProps<typeof LinkReactRouterDom>) => {
  const onLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    rest?.onClick?.(e);
  };

  return <LinkReactRouterDom {...rest} onClick={onLinkClick} />;
};
