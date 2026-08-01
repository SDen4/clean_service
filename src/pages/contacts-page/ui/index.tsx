import {
  contacts,
  mail,
  MailItem,
  MessengerItem,
  PhoneItem,
  WorkTimeItem,
} from '@/entities/contact';
import { PageWrapper } from '@/entities/page';

import { Card, CardTitle } from '@/shared/ui';

const cardStyles =
  'flex flex-col gap-5 min-w-[220px] p-4 bg-gradient-to-tl from-slate-100 to-slate-300';

const ContactsPage = () => {
  return (
    <PageWrapper>
      <h2>Контакты</h2>

      <div className="flex flex-wrap gap-10 justify-center sm:justify-start dark:[&_h6]:text-sky-950 dark:[&>div]:text-sky-950">
        <Card className={cardStyles}>
          <CardTitle>Время работы</CardTitle>
          <WorkTimeItem />
        </Card>

        <Card className={cardStyles}>
          <CardTitle>Мессенджеры</CardTitle>

          {contacts.map((el) => (
            <MessengerItem contact={el} key={el.id} />
          ))}
        </Card>

        <Card className={cardStyles}>
          <CardTitle>Телефоны</CardTitle>
          {contacts.map((el) => (
            <PhoneItem name={el.name} tel={el.tel} key={el.id} />
          ))}
        </Card>

        <Card className={cardStyles}>
          <CardTitle>Электронная почта</CardTitle>

          <MailItem mail={mail} />
        </Card>
      </div>
    </PageWrapper>
  );
};

export default ContactsPage;
