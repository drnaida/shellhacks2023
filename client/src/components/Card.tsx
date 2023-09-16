import classnames from "classnames";
import { AppProps } from "../AppProps";

declare interface CardProps extends AppProps {
  backgroundGreen?: boolean;
}

export function Card({ children, className }: CardProps): JSX.Element {
  const componentClasses = classnames(
    'rounded-xl',
    'p-2 my-2 w-full',
    'shadow-custom',
    'bg-white',
    className
  );

  return (
    <section className={componentClasses}>
      {children}
    </section>
  );
}
