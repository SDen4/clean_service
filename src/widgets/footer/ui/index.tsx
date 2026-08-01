import {
  contacts,
  mail,
  MailItem,
  MessengerItem,
  PhoneItem,
  WorkTimeItem,
} from '@/entities/contact';
import { FooterBlock } from '@/entities/footer';
import { navigationData } from '@/entities/navigation';
import {
  BlockWrapper,
  mainPageImport,
  privacyPolicyPageImport,
} from '@/entities/page';

import logo from '@/shared/assets/logoCompressed.png';
import { ROUTES } from '@/shared/config';
import { Link } from '@/shared/ui';

const Footer = () => (
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

        <FooterBlock text="Для покупателей">
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
        </FooterBlock>

        <FooterBlock text="Время работы">
          <WorkTimeItem />
        </FooterBlock>

        <FooterBlock text="Электронная почта">
          <MailItem mail={mail} />
        </FooterBlock>

        <FooterBlock text="Мессенджеры">
          {contacts.map((el) => (
            <MessengerItem contact={el} key={el.id} />
          ))}
        </FooterBlock>

        <FooterBlock text="Телефоны">
          {contacts.map((el) => (
            <PhoneItem name={el.name} tel={el.tel} key={el.id} />
          ))}
        </FooterBlock>
      </div>

      <span>&#169; 2026 БэП Ремонт. Все права защищены</span>
    </BlockWrapper>
  </footer>
);

export default Footer;
