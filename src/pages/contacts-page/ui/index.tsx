import {
  contacts,
  mail,
  MailItem,
  PhoneItem,
  TelegramItem,
} from '@/entities/contact';
import { PageWrapper } from '@/entities/page';

const blockStyles = 'flex flex-col gap-5 min-w-[200px]';

const ContactsPage = () => {
  return (
    <PageWrapper>
      <h2>Контакты</h2>
      <div className="flex flex-wrap gap-10">
        <div className={blockStyles}>
          <h4>Мессенджеры</h4>

          {contacts.map((el) => (
            <TelegramItem name={el.name} tel={el.tel} key={el.id} />
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
      </div>
    </PageWrapper>
  );
};

export default ContactsPage;
