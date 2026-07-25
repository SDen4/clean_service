import {
  contacts,
  mail,
  MailItem,
  PhoneItem,
  TelegramItem,
} from '@/entities/contact';
import { navigationData } from '@/entities/navigation';
import { BlockWrapper, mainPageImport } from '@/entities/page';

import logo from '@/shared/assets/logoCompressed.png';
import { ROUTES } from '@/shared/config';
import { Link } from '@/shared/ui';

const blockStyles = 'flex flex-col gap-3 min-w-[200px]';

export const Footer = () => (
  <footer className="flex flex-col items-center w-full pb-4 px-2 bg-sky-100 dark:bg-sky-900">
    <BlockWrapper className="items-center">
      <div className="flex flex-col flex-wrap items-center min-[480px]:items-start min-[480px]:flex-row justify-between min-w-full w-full py-6 gap-10">
        <div className="hidden md:block">
          <Link to={ROUTES.MAIN} onMouseEnter={mainPageImport}>
            <div className="flex flex-col  gap-1">
              <img src={logo} className="w-24" alt="company logo" />
              <h5 className="font-bold text-center">БэП Ремонт</h5>
            </div>
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
      </div>

      <span>&#169; 2026 БэП Ремонт. Все права защищены</span>
    </BlockWrapper>
  </footer>
);
