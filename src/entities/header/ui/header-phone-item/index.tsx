import { PhoneForwarded } from 'lucide-react';

interface IProps {
  /** Номер телефона */
  tel: string;
  /** Имя */
  name: string;
  /** Без иконки */
  hideIcon?: boolean;
}

/** Элемент телефона с именем в хедере */
export const HeaderPhoneItem = ({ tel, name, hideIcon }: IProps) => {
  return (
    <div className="flex gap-2 items-center">
      {hideIcon ? null : <PhoneForwarded />}

      <div className="flex flex-col">
        <a href={`tel:${tel}`}>
          <h6>{tel}</h6>
        </a>
        <span>{name}</span>
      </div>
    </div>
  );
};
