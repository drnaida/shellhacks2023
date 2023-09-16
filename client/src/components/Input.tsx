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
    'border border-slate-300',
    'bg-slate-50 text-darkGray',
    `text-${textSize}`,
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
    'disabled:cursor-not-allowed disabled:bg-slate-200',
    className,
  );

  return <input className={componentClasses} {...props} ref={ref}>
    {children}
  </input>
});
