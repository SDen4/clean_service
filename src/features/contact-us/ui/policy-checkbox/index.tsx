import { useEffect, useState } from 'react';

import { privacyPolicyPageImport } from '@/entities/page';

import { ROUTES } from '@/shared/config';
import { Checkbox, Link } from '@/shared/ui';

import type { TFormState } from '../../model/types';

interface IProps {
  state?: TFormState | null;
}

export const PolicyCheckbox = ({ state }: IProps) => {
  const [error, setError] = useState('');

  const v = state?.values;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (state?.errors) setError(state.errors.checkbox);
    if (state?.success) setError('');
  }, [state?.errors, state?.success]);

  const onChange = () => setError((prev) => (prev ? '' : prev));

  return (
    <Checkbox
      name="checkbox"
      isError={!!error}
      onChange={onChange}
      defaultSelected={!!v?.checkbox || false}
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
