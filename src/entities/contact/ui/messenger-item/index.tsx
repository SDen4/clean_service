import max from '@/shared/assets/MAX.svg';
import telegram from '@/shared/assets/telegram.svg';

import type { IContact } from '../../types';

const linkProps = {
  className: 'flex w-full gap-2',
  target: '_blank',
};

interface IProps {
  contact: IContact;
}

/** Элемент контакта Телеграм */
export const MessengerItem = ({ contact }: IProps) => {
  const formattedTel = contact.tel.replace(/\D/g, '');

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-2">
        <a
          {...linkProps}
          href={`tg://resolve?phone=${formattedTel}?text=${contact.name},%20здравствуйте!%20Подскажите%20пожалуйста%20`}
        >
          <img src={telegram} className="w-6 h-6" alt="telegram icon" />
        </a>

        <a {...linkProps} href={`https://max.ru/u/${contact.maxId}`}>
          <img src={max} className="w-6 h-6" alt="max icon" />
        </a>
      </div>

      <h6>{contact.name}</h6>
    </div>
  );
};
