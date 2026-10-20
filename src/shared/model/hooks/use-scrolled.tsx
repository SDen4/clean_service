import { useCallback, useEffect, useState } from 'react';

/** Определяет признак скролла страницы */
export const useScrolled = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollListenerFunc = useCallback(
    () => setIsScrolled(window.scrollY > 0),
    [],
  );

  useEffect(() => {
    document.addEventListener('scroll', scrollListenerFunc);
    return () => {
      document.removeEventListener('scroll', scrollListenerFunc);
    };
  }, [scrollListenerFunc]);

  return { isScrolled };
};
