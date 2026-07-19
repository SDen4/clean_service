import { Link } from 'react-router-dom';

import {
  contacts,
  HeaderMailItem,
  HeaderPhoneItem,
  mail,
} from '@/entities/header';
import { navigationData } from '@/entities/navigation';
import { BlockWrapper, mainPageImport } from '@/entities/page';

import logo from '@/shared/assets/logoCompressed.png';
import { ROUTES } from '@/shared/config';

export const Footer = () => (
  <footer className="flex flex-col items-center w-full pb-4 px-2 bg-sky-100 dark:bg-sky-900">
    <BlockWrapper className="items-center">
      <div className="flex flex-col items-center min-[480px]:items-start min-[480px]:flex-row justify-between min-w-full w-full py-6 gap-10">
        <div className="hidden md:block">
          <Link to={ROUTES.MAIN} onMouseEnter={mainPageImport}>
            <div className="flex flex-col  gap-1 min-w-[200px]">
              <img src={logo} className="w-24" alt="company logo" />
              <h5 className="font-bold">БэП Ремонт</h5>
            </div>
          </Link>
        </div>

        <div className="flex flex-col gap-3 min-w-[200px]">
          <h4>Для покупателей</h4>

          {navigationData.map((el) => (
            <Link key={el.id} to={el.route} className="flex w-full gap-2">
              {el.icon}
              {el.title}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3 min-w-[200px]">
          <h4>Контакты</h4>

          {contacts.map((el) => (
            <HeaderPhoneItem name={el.name} tel={el.tel} key={el.id} />
          ))}
          <HeaderMailItem mail={mail} />
        </div>
      </div>

      <span>&#169; 2026 БэП Ремонт. Все права защищены</span>
    </BlockWrapper>
  </footer>
);
