import { useNavigate } from 'react-router-dom';
import { House } from 'lucide-react';

import { ROUTES } from '@/shared/config';
import { Button } from '@/shared/ui';

export const GoMainButton = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(ROUTES.MAIN);
    window.location.reload();
  };

  return (
    <Button variant="outline" onClick={onClick} aria-label="На главную">
      <House /> На главную
    </Button>
  );
};
