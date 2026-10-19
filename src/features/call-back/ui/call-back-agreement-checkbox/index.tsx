import type { TErrors, TValues } from '@/entities/call-back';

import { Checkbox } from '@/shared/ui';

interface IProps {
  values: TValues;
  setValues: React.Dispatch<React.SetStateAction<TValues>>;
  errors: TErrors;
  setErrors: React.Dispatch<React.SetStateAction<TErrors>>;
  isDisabled: boolean;
}

export const CallBackAgreementCheckbox = ({
  values,
  setValues,
  errors,
  setErrors,
  isDisabled,
}: IProps) => {
  const error = errors.checkboxAgreement;
  const value = values.checkboxAgreement;

  const onChange = () => {
    if (isDisabled) return;
    if (error) setErrors((prev) => ({ ...prev, checkboxAgreement: '' }));
    setValues((prev) => ({
      ...prev,
      checkboxAgreement: !prev.checkboxAgreement,
    }));
  };

  return (
    <Checkbox
      name="checkboxAgreement"
      isError={!!error}
      onChange={onChange}
      checked={value || false}
      disabled={isDisabled}
    >
      <span className={`${!!error && 'text-red-500'}`}>
        Я согласен(на), что обращение будет обработано в соответствии с порядком
        выполнения заявок: звонок выполняется в течение 1–2 часов в рабочее
        время;
        <br />
        вне рабочего времени — в следующий рабочий день.
      </span>
    </Checkbox>
  );
};
