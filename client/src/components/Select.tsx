import classNames from "classnames";
import React, { forwardRef, SelectHTMLAttributes } from "react";

declare interface SelectProps extends React.DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
}

export const Select = forwardRef(({ children, className, ...props }: SelectProps, ref: React.LegacyRef<HTMLSelectElement>) => {
  const componentClasses = classNames(
    'rounded-md w-full p-2.5',
    'border border-slate-300 dark:border-slate-800',
    'bg-slate-50 text-slate-900 dark:bg-slate-600 dark:text-slate-100 bg-opacity-80 hover:bg-opacity-100',
    'text-sm',
    className,
  );
  return <select className={componentClasses} {...props} ref={ref}>
    {children}
  </select>
});
