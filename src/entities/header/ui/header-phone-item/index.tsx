import { PhoneForwarded } from 'lucide-react';

interface IProps {
  /** Номер телефона */
  tel: string;
  /** Имя */
  name: string;
}

/** Элемент телефона с именем в хедере */
export const HeaderPhoneItem = ({ tel, name }: IProps) => {
  return (
    <div className="flex gap-2 items-center">
      <PhoneForwarded className="stroke-blue-500 group-hover:stroke-grey-500" />

      <div className="flex flex-col">
        <a href={`tel:${tel}`}>
          <h6>{tel}</h6>
        </a>
        <span>{name}</span>
      </div>
    </div>
  );
};
