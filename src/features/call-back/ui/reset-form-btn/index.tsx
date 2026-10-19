import { Trash } from 'lucide-react';

import {
  defaultErrors,
  defaultValues,
  type TErrors,
  type TValues,
} from '@/entities/call-back';

import { Button } from '@/shared/ui';

interface IProps {
  setValues: React.Dispatch<React.SetStateAction<TValues>>;
  setErrors: React.Dispatch<React.SetStateAction<TErrors>>;
}

/** Кнопка очистки формы Перезвонить мне */
export const ResetFormBtn = ({ setValues, setErrors }: IProps) => {
  const onResetValue = () => {
    setErrors(defaultErrors);
    setValues(defaultValues);
  };

  return (
    <Button variant="outline" type="button" onClick={onResetValue}>
      <Trash />
      Очистить
    </Button>
  );
};
