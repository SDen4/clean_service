import { useNavigate } from 'react-router-dom';
import { MailQuestionMark } from 'lucide-react';

import type { IOffer } from '@/entities/catalog';

import { ROUTES } from '@/shared/config';
import { Button } from '@/shared/ui';

interface IProps {
  /** данные о товаре */
  product?: IOffer;
}

/** Кнопка "Задать вопрос по товару" в карточке товара */
export const ProductQuestionButton = ({ product }: IProps) => {
  const navigate = useNavigate();
  const href = window.location.href;

  const onClick = () =>
    navigate(`/${ROUTES.CONTACT_US}`, { state: { product, href } });

  return (
    <Button variant="outline" onClick={onClick}>
      <MailQuestionMark />
      Задать вопрос по товару
    </Button>
  );
};
