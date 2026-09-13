import { TriangleAlert } from 'lucide-react';

import { ErrorPageWrapper, GoMainButton } from '@/shared/ui';

import type { IErrorPageProps } from '../model/types';

const defaultTitle = 'Ошибка';
const defaultText = 'Запрашиваемой страницы не существует';

const ErrorPage = ({ title, text, icon }: IErrorPageProps) => {
  const Icon = icon ?? TriangleAlert;

  return (
    <ErrorPageWrapper icon={Icon}>
      <h1>{title ?? defaultTitle}</h1>
      <h4 className="text-center">{text ?? defaultText}</h4>

      <GoMainButton />
    </ErrorPageWrapper>
  );
};

export default ErrorPage;
