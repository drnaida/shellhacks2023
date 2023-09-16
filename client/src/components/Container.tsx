import classNames from "classnames";
import { AppProps } from "../AppProps";

declare interface ContainerProps extends AppProps {
  width?: 'full' | 'narrow' | undefined;
}

export function Container({ children, className, width }: ContainerProps): JSX.Element {
  const componentClasses = classNames(className, 'p-1 px-2 mx-auto',
    { 'lg:w-3/5': width === 'narrow' }
  );

  return <div className={componentClasses}>
    {children}
  </div>
}
