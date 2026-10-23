import type { ChangeEvent } from 'react';

import {
  maxMessageLength,
  type TErrors,
  type TValues,
} from '@/entities/contact-us';

import {
  Field,
  FieldError,
  FieldLabel,
  InputXButton,
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
      <div className="flex w-full justify-between items-end">
        <FieldLabel>Сообщение *</FieldLabel>

        {!!value && (
          <small className="self-end">
            {value.length} / {maxMessageLength}
          </small>
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
          <InputXButton
            className="top-[17px] rounded-br-none"
            onClick={onResetValue}
            disabled={isDisabled}
          />
        )}

        {!!error && <FieldError>{error}</FieldError>}
      </div>
    </Field>
  );
};
