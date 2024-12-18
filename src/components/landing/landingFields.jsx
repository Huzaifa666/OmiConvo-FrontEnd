import { cn } from '@/utility/utils';
import clsx from 'clsx';
import { useId } from 'react';

const formClasses =
  'block w-full appearance-none rounded-md bg-gray-100 border px-3 py-2 text-gray-900 placeholder-gray-400 sm:text-sm';

function Label({ id, children }) {
  return (
    <label htmlFor={id} className="mb-2 block text-sm font-medium text-black">
      {children}
    </label>
  );
}

export const TextField = ({
  value,
  onChange,
  onFocus,
  onBlur,
  error,
  label,
  type = 'text',
  placeholder,
  rightIcon,
  className,
  ...props
}) => {
  const id = useId();
  const borderColorClass = error
    ? 'border-red-500 focus:border-red-500 focus:outline-none focus:ring-blue-500'
    : 'border-grey-200 focus:border-blue-500 focus:outline-none focus:ring-blue-500';

  return (
    <>
      <div className={cn('relative my-1', className)}>
        {label && <Label id={id}>{label}</Label>}
        <input
          id={id}
          type={type}
          {...props}
          className={cn(formClasses, borderColorClass)}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {rightIcon && (
          <div className="absolute bottom-0 right-0 top-8 flex cursor-pointer items-center pr-3 text-sm leading-5 text-gray-500">
            {rightIcon}
          </div>
        )}
        {error && (
          <div className="absolute my-2 text-xs text-red-600">{error}</div>
        )}
      </div>
    </>
  );
};

export const SelectField = ({ label, className, ...props }) => {
  const id = useId();

  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <select id={id} {...props} className={clsx(formClasses, 'pr-8')} />
    </div>
  );
};

export const CheckboxField = ({
  value,
  onChange,
  onFocus,
  onBlur,
  error,
  label,
  className,
  ...props
}) => {
  const id = useId();
  return (
    <div className={cn('relative', className)}>
      <div className="flex h-6 items-center">
        <input
          id={id}
          {...props}
          type="checkbox"
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
      </div>
      <div className="ml-3 flex text-sm leading-6">{label}</div>
      {error && (
        <div className="absolute top-4 my-4 p-0 text-xs text-red-600">
          {error}
        </div>
      )}
    </div>
  );
};
