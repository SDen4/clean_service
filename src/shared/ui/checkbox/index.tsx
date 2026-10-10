import type { ComponentProps, ReactNode } from 'react';

import { CheckboxButton, CheckboxField } from 'react-aria-components';

interface IProps extends Omit<
  ComponentProps<typeof CheckboxField>,
  'children'
> {
  children: ReactNode;
  isError?: boolean;
}

export const Checkbox = ({
  className,
  children,
  isError,
  ...props
}: IProps) => {
  return (
    <CheckboxField {...props}>
      <CheckboxButton
        className={`group flex items-center gap-2 cursor-pointer ${className ?? ''}`}
      >
        <span
          className={`
            flex h-5 w-5 shrink-0 items-center justify-center
            rounded border border-blue-500
            group-data-[selected]:bg-blue-500 group-data-[selected]:border-blue-500
            group-data-[disabled]:opacity-50
            ${isError && 'border-red-500'}
          `}
        >
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            className="opacity-0 group-data-[selected]:opacity-100"
          >
            <path
              d="M5 12l5 5L20 7"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        {children && <span className="text-sm select-none">{children}</span>}
      </CheckboxButton>
    </CheckboxField>
  );
};
