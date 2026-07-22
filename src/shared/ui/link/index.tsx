import type { ComponentProps } from 'react';
import { Link as LinkReactRouterDom } from 'react-router-dom';

/** Link с добавленным обработчиком onClick для скролла страницы вверх */
export const Link = ({
  ...rest
}: ComponentProps<typeof LinkReactRouterDom>) => {
  const onLinkClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return <LinkReactRouterDom {...rest} onClick={onLinkClick} />;
};
