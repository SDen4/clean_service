import { useNavigate } from 'react-router-dom';
import { House, TriangleAlert } from 'lucide-react';

import logo from '@/shared/assets/logoCompressed.png';
import { ROUTES } from '@/shared/config';
import { Button } from '@/shared/ui';

interface IProps {
  title?: string;
  text?: string;
  icon?: React.ElementType;
}

const defaultTitle = 'Ошибка';
const defaultText = 'Запрашиваемой страницы не существует';

const ErrorPage = ({ title, text, icon }: IProps) => {
  const navigate = useNavigate();

  const Icon = icon ?? TriangleAlert;

  const onClick = () => navigate(ROUTES.MAIN);

  return (
    <div className="flex flex-col gap-16 justify-center items-center w-full h-screen">
      <div className="relative -mt-48">
        <img src={logo} alt="логотип" className="w-60 h-40" />
        <Icon className="fill-gray-100 stroke-orange-500 size-24 absolute top-24 left-[70px]" />
      </div>

      <div className="flex flex-col justify-center items-center gap-10">
        <h1>{title ?? defaultTitle}</h1>
        <h4 className="text-center">{text ?? defaultText}</h4>
        <Button variant="outline" onClick={onClick}>
          <House /> На главную
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
