import { Mail } from 'lucide-react';

interface IProps {
  /** Адрес электронной почты */
  mail: string;
  /** Без иконки */
  hideIcon?: boolean;
}

/** Элемент электронной почты */
export const MailItem = ({ mail, hideIcon }: IProps) => {
  return (
    <div className="flex gap-2 items-center">
      {hideIcon ? null : <Mail />}

      <a href={`mailto:${mail}`}>
        <h6>{mail}</h6>
      </a>
    </div>
  );
};
