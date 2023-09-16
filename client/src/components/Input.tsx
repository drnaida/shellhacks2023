import classNames from "classnames";
import { forwardRef, InputHTMLAttributes } from "react";

declare interface InputProps extends React.DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  textSize?: 'sm' | 'md' | 'lg';
  widthClasses?: string;
}

export const Input = forwardRef(({ children, className, textSize, widthClasses, ...props }: InputProps, ref: React.LegacyRef<HTMLInputElement>) => {
  textSize = textSize || 'sm';
  widthClasses = widthClasses || 'w-full p-2.5';

  const componentClasses = classNames(
    'rounded-md',
    widthClasses,
    'border border-slate-300 dark:border-slate-800',
    'bg-slate-50 text-slate-900 dark:bg-slate-600 dark:text-slate-100',
    `text-${textSize}`,
    'disabled:cursor-not-allowed disabled:bg-slate-200 disabled:dark:bg-slate-500',
    className,
  );

  return <input className={componentClasses} {...props} ref={ref}>
    {children}
  </input>
});
