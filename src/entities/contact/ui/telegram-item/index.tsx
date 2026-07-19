import telegram from '@/shared/assets/telegram.svg';

interface IProps {
  name: string;
  tel: string;
}

/** Элемент контакта Телеграм */
export const TelegramItem = ({ name, tel }: IProps) => {
  const formattedTel = tel.replace(/\D/g, '');

  return (
    <a
      className="flex w-full gap-2"
      href={`tg://resolve?phone=${formattedTel}?text=${name},%20здравствуйте!%20Подскажите%20пожалуйста%20`}
      target="_blank"
    >
      <img src={telegram} className="w-6 h-6" />
      <h6>{name}</h6>
    </a>
  );
};
