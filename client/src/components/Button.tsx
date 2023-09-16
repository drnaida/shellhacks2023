import classNames from "classnames";
import { AppProps } from "../AppProps";
import Themes, { ThemableProps } from "../ThemableProps";

export declare interface ButtonProps extends ThemableProps, AppProps {
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  size?: 'small' | 'medium',
  type?: 'button' | 'submit' | 'reset'
}

export function Button({ theme, size, type, ...props }: ButtonProps): JSX.Element {
  size = size ?? 'medium';
  type = type ?? 'button';
  const componentClasses = classNames(
    props.className,
    'inline-flex w-auto rounded-md',
    'mx-1',
    { 'p-1 text-sm': size === 'small' },
    { 'p-2 text-md': size === 'medium' },
    'font-medium',
    'shadow-sm',
    'bg-opacity-75 hover:bg-opacity-90',
    'disabled:bg-opacity-20 disabled:shadow-none disabled:cursor-not-allowed',
    'disabled:ring-0',
    'transition-all',
    'text-white',
    'bg-primary',
    (theme ?? Themes.Primary).getButton()
  );

  return (
    <button className={componentClasses}
      type={type}
      onClick={props.onClick}
      disabled={props.disabled}>
      {props.children}
    </button>
  );
}
