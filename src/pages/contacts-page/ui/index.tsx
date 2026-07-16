import {
  contacts,
  HeaderMailItem,
  HeaderPhoneItem,
  mail,
} from '@/entities/header';
import { PageWrapper } from '@/entities/page';

const ContactsPage = () => {
  return (
    <PageWrapper>
      <div className="flex flex-col gap-10">
        <h2>Контакты</h2>

        <div className="flex flex-col gap-5">
          <h4>Телефоны</h4>
          {contacts.map((el) => (
            <HeaderPhoneItem name={el.name} tel={el.tel} key={el.id} />
          ))}
        </div>

        <div className="flex flex-col gap-5">
          <h4>Электронная почта</h4>

          <HeaderMailItem mail={mail} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default ContactsPage;
