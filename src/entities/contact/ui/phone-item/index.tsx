import { PhoneForwarded } from 'lucide-react';

interface IProps {
  /** Номер телефона */
  tel: string;
  /** Имя */
  name: string;
  /** Без иконки */
  hideIcon?: boolean;
}

/** Элемент телефона */
export const PhoneItem = ({ tel, name, hideIcon }: IProps) => {
  return (
    <div className="flex gap-2 items-start">
      {hideIcon ? null : <PhoneForwarded className="pt-1" />}

      <div className="flex flex-col">
        <a href={`tel:${tel}`}>
          <h6>{tel}</h6>
        </a>
        <span>{name}</span>
      </div>
    </div>
  );
};
