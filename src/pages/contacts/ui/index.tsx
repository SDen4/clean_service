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

const gradientStyle = 'bg-gradient-to-tl from-slate-100 to-slate-300';
const cardStyles = `flex flex-col gap-5 min-w-[220px] p-4 bg-gradient-to-tl from-slate-100 to-slate-300 ${gradientStyle}`;

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

      <h2>Адрес</h2>

      <div className={`rounded-xl w-full md:w-fit p-2 ${gradientStyle}`}>
        <div className="overflow-hidden rounded-xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d2182.507943520939!2d60.5799851!3d56.8372307!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sru!4v1787066207054!5m2!1sru!2sru" // TEMP !!!
            width="725"
            height="450"
            style={{ borderRadius: '8px' }}
            loading="lazy"
            allowTransparency
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </PageWrapper>
  );
};

export default ContactsPage;
