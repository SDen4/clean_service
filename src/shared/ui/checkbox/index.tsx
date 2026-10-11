import type { ComponentProps, ReactNode } from 'react';

interface IProps extends Omit<ComponentProps<'input'>, 'type' | 'children'> {
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
    <label
      className={`group flex items-center gap-2 cursor-pointer ${className ?? ''}`}
    >
      <input type="checkbox" className="peer sr-only" {...props} />
      <span
        className={`
          flex h-5 w-5 shrink-0 items-center justify-center
          rounded border border-blue-500
          peer-checked:bg-blue-500 peer-checked:border-blue-500
          peer-disabled:opacity-50
          ${isError ? 'border-red-500' : ''}
        `}
      >
        <svg
          viewBox="0 0 24 24"
          width="14"
          height="14"
          fill="none"
          className="opacity-0 group-has-[:checked]:opacity-100"
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
    </label>
  );
};
