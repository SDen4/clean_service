import { Mail } from 'lucide-react';

interface IProps {
  /** Адрес электронной почты */
  mail: string;
}

/** Элемент электронной почты в хедере */
export const HeaderMailItem = ({ mail }: IProps) => {
  return (
    <div className="flex gap-2 items-center">
      <Mail className="stroke-blue-500 group-hover:stroke-grey-500" />

      <a href={`mailto:${mail}`}>
        <h6>{mail}</h6>
      </a>
    </div>
  );
};
