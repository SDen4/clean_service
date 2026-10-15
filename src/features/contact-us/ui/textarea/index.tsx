import type { ChangeEvent } from 'react';
import { X } from 'lucide-react';

import {
  maxMessageLength,
  type TErrors,
  type TValues,
} from '@/entities/contact-us';

import {
  Button,
  Field,
  FieldError,
  FieldLabel,
  Textarea as TextareaShared,
} from '@/shared/ui';

interface IProps {
  values: TValues;
  setValues: React.Dispatch<React.SetStateAction<TValues>>;
  errors: TErrors;
  setErrors: React.Dispatch<React.SetStateAction<TErrors>>;
  isDisabled: boolean;
}

export const Textarea = ({
  values,
  setValues,
  errors,
  setErrors,
  isDisabled,
}: IProps) => {
  const error = errors.message;
  const value = values.message;

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (isDisabled) return;

    const newValue = e.target.value;

    if (error) setErrors((prev) => ({ ...prev, message: '' }));

    if (newValue?.length > maxMessageLength) {
      setErrors((prev) => ({
        ...prev,
        message: `Максимальное кол-во символов: ${maxMessageLength}`,
      }));
      return;
    }

    setValues((prev) => ({ ...prev, message: newValue }));
  };

  const onResetValue = () => {
    if (isDisabled) return;
    if (error) setErrors((prev) => ({ ...prev, message: '' }));
    setValues((prev) => ({ ...prev, message: '' }));
  };

  return (
    <Field data-invalid={!!error}>
      <div className="flex w-full justify-between items-end h-5">
        <FieldLabel>Сообщение *</FieldLabel>

        {!!value && (
          <span className="self-end">
            {value.length} / {maxMessageLength}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1 relative min-w-[300px] min-h-[240px]">
        <TextareaShared
          value={value ?? ''}
          rows={10}
          placeholder="Введите сообщение"
          name="message"
          onChange={onChange}
          className={`pr-8 ${!!error && 'placeholder:text-red-300'}`}
          aria-invalid={!!error}
          disabled={isDisabled}
        />

        {!!value && (
          <Button
            variant="ghost"
            className="absolute right-1 top-5 -translate-y-1/2 hover:bg-transparent outline-none border-0"
            onClick={onResetValue}
            disabled={isDisabled}
          >
            <X />
          </Button>
        )}

        {!!error && <FieldError>{error}</FieldError>}
      </div>
    </Field>
  );
};
