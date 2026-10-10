import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

import {
  Button,
  Field,
  FieldError,
  FieldLabel,
  Input as InputShared,
} from '@/shared/ui';

import type { TFormState, TInputItem } from '../../model/types';

interface IProps {
  state?: TFormState | null;
  item: TInputItem;
}

export const Input = ({ state, item }: IProps) => {
  const [error, setError] = useState('');

  const v = state?.values;

  const onChange = () => setError((prev) => (prev ? '' : prev));

  const onResetValue = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const form = e.currentTarget.form;
    if (!form) return;

    const field = form.elements.namedItem(item.id);
    if (field instanceof HTMLInputElement) field.value = '';
  };

  const Icon = item.icon;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (state?.errors) setError(state.errors?.[item.id]);
    if (state?.success) setError('');
  }, [item.id, state?.errors, state?.success]);

  return (
    <Field className="min-h-[90px]" data-invalid={!!error}>
      <FieldLabel htmlFor={`${item.id}Id`}>{item.label}</FieldLabel>

      <div className="flex flex-col gap-1">
        <div className="relative min-w-[300px]">
          <Icon
            className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none ${!!error && 'stroke-red-600'}`}
          />

          <InputShared
            defaultValue={v?.[item.id] ?? ''}
            className={`pr-10 pl-10 py-4 ${!!error && 'placeholder:text-red-300'}`}
            type={item.type}
            name={item.id}
            id={`${item.id}Id`}
            placeholder={item.placeholder}
            onChange={onChange}
            aria-invalid={!!error}
          />

          <Button
            variant="ghost"
            className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-transparent outline-none border-0"
            onClick={onResetValue}
          >
            <X />
          </Button>
        </div>

        {!!error && <FieldError>{error}</FieldError>}
      </div>
    </Field>
  );
};
