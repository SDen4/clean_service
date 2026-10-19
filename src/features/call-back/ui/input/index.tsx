import type { ChangeEvent } from 'react';
import { X } from 'lucide-react';
import { withMask } from 'use-mask-input';

import type { TErrors, TInputItem, TValues } from '@/entities/call-back';

import {
  Button,
  Field,
  FieldError,
  FieldLabel,
  Input as InputShared,
} from '@/shared/ui';

interface IProps {
  values: TValues;
  setValues: React.Dispatch<React.SetStateAction<TValues>>;
  errors: TErrors;
  setErrors: React.Dispatch<React.SetStateAction<TErrors>>;
  isDisabled: boolean;
  item: TInputItem;
}

export const Input = ({
  values,
  setValues,
  errors,
  setErrors,
  isDisabled,
  item,
}: IProps) => {
  const error = errors[item.id];
  const value = values[item.id];

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) return;

    const newValue = e.target.value;
    if (error) setErrors((prev) => ({ ...prev, [item.id]: '' }));

    if (item?.pattern && newValue) {
      const regExp = new RegExp(item.pattern);

      if (!regExp.test(newValue)) {
        setErrors((prev) => ({ ...prev, [item.id]: 'Недопустимый символ' }));
        return;
      }
    }

    if (newValue?.length > item.maxLength) {
      setErrors((prev) => ({
        ...prev,
        [item.id]: `Максимальное кол-во символов: ${item.maxLength}`,
      }));
      return;
    }

    setValues((prev) => ({ ...prev, [item.id]: newValue }));
  };

  const onResetValue = () => {
    if (isDisabled) return;
    if (error) setErrors((prev) => ({ ...prev, [item.id]: '' }));
    setValues((prev) => ({ ...prev, [item.id]: '' }));
  };

  const Icon = item.icon;

  return (
    <Field className="min-h-[90px] max-w-96" data-invalid={!!error}>
      <FieldLabel htmlFor={`${item.id}Id`}>{item.label}</FieldLabel>

      <div className="flex flex-col gap-1">
        <div className="relative min-w-[300px]">
          <Icon
            className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none ${!!error && 'stroke-red-600'}`}
          />

          <InputShared
            value={value ?? ''}
            className={`pr-10 pl-10 py-4 ${!!error && 'placeholder:text-red-300'}`}
            type={item.type}
            inputMode={item?.inputMode}
            name={item.id}
            id={`${item.id}Id`}
            placeholder={item.placeholder}
            onChange={onChange}
            aria-invalid={!!error}
            disabled={isDisabled}
            ref={
              item.id === 'phone' ? withMask('\\+7 (999) 999-99-99') : undefined
            }
          />

          {!!value && (
            <Button
              variant="ghost"
              className="absolute right-[1px] top-1/2 -translate-y-1/2 hover:bg-transparent outline-none border-0 rounded-tl-none rounded-bl-none focus:bg-sky-200"
              onClick={onResetValue}
              disabled={isDisabled}
            >
              <X />
            </Button>
          )}
        </div>

        {!!error && <FieldError>{error}</FieldError>}
      </div>
    </Field>
  );
};
