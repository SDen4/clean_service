import { useNavigate } from 'react-router-dom';
import { House, TriangleAlert } from 'lucide-react';

import { ROUTES } from '@/shared/config';
import { Button, ErrorPageWrapper } from '@/shared/ui';

import type { IErrorPageProps } from '../model/types';

const defaultTitle = 'Ошибка';
const defaultText = 'Запрашиваемой страницы не существует';

const ErrorPage = ({ title, text, icon }: IErrorPageProps) => {
  const navigate = useNavigate();

  const Icon = icon ?? TriangleAlert;

  const onClick = () => navigate(ROUTES.MAIN);

  return (
    <ErrorPageWrapper icon={Icon}>
      <h1>{title ?? defaultTitle}</h1>
      <h4 className="text-center">{text ?? defaultText}</h4>
      <Button variant="outline" onClick={onClick} aria-label="На главную">
        <House /> На главную
      </Button>
    </ErrorPageWrapper>
  );
};

export default ErrorPage;
