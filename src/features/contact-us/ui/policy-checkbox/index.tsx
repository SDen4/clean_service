import type { TErrors, TValues } from '@/entities/contact-us';
import { privacyPolicyPageImport } from '@/entities/page';

import { ROUTES } from '@/shared/config';
import { Checkbox, Link } from '@/shared/ui';

interface IProps {
  values: TValues;
  setValues: React.Dispatch<React.SetStateAction<TValues>>;
  errors: TErrors;
  setErrors: React.Dispatch<React.SetStateAction<TErrors>>;
  isDisabled: boolean;
}

export const PolicyCheckbox = ({
  values,
  setValues,
  errors,
  setErrors,
  isDisabled,
}: IProps) => {
  const error = errors.checkbox;
  const value = values.checkbox;

  const onChange = () => {
    if (isDisabled) return;
    if (error) setErrors((prev) => ({ ...prev, checkbox: '' }));
    setValues((prev) => ({ ...prev, checkbox: !prev.checkbox }));
  };

  return (
    <Checkbox
      name="checkbox"
      isError={!!error}
      onChange={onChange}
      checked={value || false}
      disabled={isDisabled}
    >
      <span className={`${!!error && 'text-red-500'}`}>
        Я даю свое согласие на обработку персональных данных в соответствии с{' '}
        <Link
          to={`/${ROUTES.PRIVACY_POLICY}`}
          onMouseEnter={privacyPolicyPageImport}
          className="text-blue-500 underline"
        >
          Политикой конфиденциальности
        </Link>{' '}
      </span>
    </Checkbox>
  );
};
