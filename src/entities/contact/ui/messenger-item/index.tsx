import { max, telegram } from '@/shared/model';

import type { IContact } from '../../model/types';

const linkProps = {
  className: 'flex w-full gap-2',
  target: '_blank',
};

interface IProps {
  contact: IContact;
}

/** Элемент контакта Телеграм */
export const MessengerItem = ({ contact }: IProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-2">
        {!!contact.telegramLogin && (
          <a
            {...linkProps}
            href={`https://t.me/@${contact.telegramLogin}?text=${contact.name},%20здравствуйте!%20Подскажите%20пожалуйста%20(введите%20свой%20вопрос)`}
          >
            <img src={telegram} className="w-6 h-6" alt="telegram icon" />
          </a>
        )}

        <a {...linkProps} href={`https://max.ru/u/${contact.maxId}`}>
          <img src={max} className="w-6 h-6" alt="max icon" />
        </a>
      </div>

      <h6>{contact.name}</h6>
    </div>
  );
};
