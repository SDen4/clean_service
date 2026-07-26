import { CalendarDays, Clock7 } from 'lucide-react';

import {
  contacts,
  mail,
  MailItem,
  PhoneItem,
  TelegramItem,
} from '@/entities/contact';
import { navigationData } from '@/entities/navigation';
import {
  BlockWrapper,
  mainPageImport,
  privacyPolicyPageImport,
} from '@/entities/page';

import logo from '@/shared/assets/logoCompressed.png';
import { ROUTES } from '@/shared/config';
import { Link } from '@/shared/ui';

const blockStyles = 'flex flex-col gap-3 sm:min-w-0 min-w-[200px]';

export const Footer = () => (
  <footer className="flex flex-col items-center w-full pb-4 px-2 bg-sky-100 dark:bg-sky-900">
    <BlockWrapper className="items-center">
      <div className="flex flex-col-reverse [480px]:flex-col flex-wrap items-center min-[480px]:items-start min-[480px]:flex-row justify-between min-w-full w-full py-6 gap-x-4 gap-y-8">
        <div className="flex flex-col items-center sm:items-start gap-1">
          <Link
            to={ROUTES.MAIN}
            onMouseEnter={mainPageImport}
            className="flex w-fit flex-col  gap-1"
          >
            <img src={logo} className="w-24" alt="company logo" />
            <h5 className="font-bold text-center">БэП Ремонт</h5>
          </Link>

          <Link
            to={ROUTES.PRIVACY_POLICY}
            onMouseEnter={privacyPolicyPageImport}
          >
            Политика конфиденциальности
          </Link>
        </div>

        <div className={blockStyles}>
          <h4>Для покупателей</h4>

          {navigationData.map((el) => (
            <Link
              key={el.id}
              to={el.route}
              className="flex w-full gap-2"
              onMouseEnter={el.importFunc}
            >
              {el.icon}
              {el.title}
            </Link>
          ))}
        </div>

        <div className={blockStyles}>
          <h4>Телефоны</h4>

          {contacts.map((el) => (
            <PhoneItem name={el.name} tel={el.tel} key={el.id} />
          ))}
        </div>

        <div className={blockStyles}>
          <h4>Электронная почта</h4>

          <MailItem mail={mail} />
        </div>

        <div className={blockStyles}>
          <h4>Мессенджеры</h4>

          {contacts.map((el) => (
            <TelegramItem name={el.name} tel={el.tel} key={el.id} />
          ))}
        </div>

        <div className={blockStyles}>
          <h4>Время работы</h4>

          <div className="flex items-center gap-2">
            <Clock7 />
            <h6>09:00 - 19:00</h6>
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays />
            <h6>Пн - Вс</h6>
          </div>
        </div>
      </div>

      <span>&#169; 2026 БэП Ремонт. Все права защищены</span>
    </BlockWrapper>
  </footer>
);
