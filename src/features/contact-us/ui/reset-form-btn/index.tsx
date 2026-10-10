import { Trash } from 'lucide-react';

import { Button } from '@/shared/ui';

/** Кнопка очистки формы обратной связи */
export const ResetFormBtn = () => {
  const onResetValue = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const form = e.currentTarget.form;
    if (!form) return;

    const fieldName = form.elements.namedItem('name');
    const fieldPhone = form.elements.namedItem('phone');
    const fieldEmail = form.elements.namedItem('email');
    const fieldMessage = form.elements.namedItem('message');

    // Очищаем все, кроме чекбокса
    if (fieldName instanceof HTMLInputElement) fieldName.value = '';
    if (fieldPhone instanceof HTMLInputElement) fieldPhone.value = '';
    if (fieldEmail instanceof HTMLInputElement) fieldEmail.value = '';
    if (fieldMessage instanceof HTMLTextAreaElement) fieldMessage.value = '';
  };

  return (
    <Button variant="outline" type="button" onClick={onResetValue}>
      <Trash />
      Очистить
    </Button>
  );
};
