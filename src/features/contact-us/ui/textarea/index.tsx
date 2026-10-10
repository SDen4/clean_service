import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

import {
  Button,
  Field,
  FieldError,
  FieldLabel,
  Textarea as TextareaShared,
} from '@/shared/ui';

import type { TFormState } from '../../model/types';

interface IProps {
  state?: TFormState | null;
}

export const Textarea = ({ state }: IProps) => {
  const [error, setError] = useState('');

  const v = state?.values;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (state?.errors) setError(state.errors.message);
    if (state?.success) setError('');
  }, [state?.errors, state?.success]);

  const onChange = () => setError((prev) => (prev ? '' : prev));

  const onResetValue = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const form = e.currentTarget.form;
    if (!form) return;

    const field = form.elements.namedItem('message');

    if (field instanceof HTMLTextAreaElement) field.value = '';
  };

  return (
    <Field data-invalid={!!error}>
      <FieldLabel>Сообщение *</FieldLabel>
      <div className="flex flex-col gap-1 relative min-w-[300px] min-h-[240px]">
        <TextareaShared
          defaultValue={v?.message ?? ''}
          rows={10}
          placeholder="Введите сообщение"
          name="message"
          onChange={onChange}
          className={`pr-8 ${!!error && 'placeholder:text-red-300'}`}
          aria-invalid={!!error}
        />
        <Button
          variant="ghost"
          className="absolute right-1 top-5 -translate-y-1/2 hover:bg-transparent outline-none border-0"
          onClick={onResetValue}
        >
          <X />
        </Button>
        {!!error && <FieldError>{error}</FieldError>}
      </div>
    </Field>
  );
};
