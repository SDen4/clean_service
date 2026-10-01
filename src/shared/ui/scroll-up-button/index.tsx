import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

import { Button } from '../button';

const pageHeight = document.documentElement.scrollHeight;

export const ScrollUpButton = () => {
  const onClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const [isVisible, setVisible] = useState(false);

  const setVisibleState = () => {
    if (!isVisible) {
      window.requestAnimationFrame(() => {
        setVisible(window.scrollY > pageHeight / 2);
      });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', setVisibleState);

    return () => {
      window.removeEventListener('scroll', setVisibleState);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Button
      variant="outline"
      onClick={onClick}
      className={`fixed right-10 bottom-10 translate-y-10 opacity-0 pointer-events-none z-50 ${isVisible ? 'translate-y-0 opacity-1 pointer-events-auto' : ''}`}
    >
      <ArrowUp className="animate-ping" />
    </Button>
  );
};
