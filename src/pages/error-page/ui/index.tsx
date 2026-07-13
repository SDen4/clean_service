import { useNavigate } from 'react-router-dom';
import { House, TriangleAlert } from 'lucide-react';

import logo from '@/shared/assets/logoCompressed.png';
import { ROUTES } from '@/shared/config';
import { Button } from '@/shared/ui';

const ErrorPage = () => {
  let navigate = useNavigate();

  const onClick = () => navigate(ROUTES.MAIN);

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <div className="relative -mt-48">
        <img src={logo} alt="логотип" className="w-60 h-60" />
        <TriangleAlert className="fill-gray-100 stroke-orange-500 size-24 absolute top-20 left-[72px]" />
      </div>

      <div className="flex flex-col justify-center items-center gap-10">
        <h1>Ошибка</h1>
        <h4 className="text-center">Запрашиваемой страницы не существует</h4>
        <Button variant="outline" onClick={onClick}>
          <House /> На главную
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
