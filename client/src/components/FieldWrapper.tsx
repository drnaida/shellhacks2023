import classNames from "classnames";
import { useFormikContext } from "formik";
import { AppProps } from "../AppProps";

declare interface FieldWrapperProps extends AppProps {
  for: string;
  label?: string | JSX.Element;
  inline?: boolean;
}

export function FieldWrapper({ children, label, inline, ...props }: FieldWrapperProps): JSX.Element {
  const { errors } = useFormikContext();

  const componentClasses = classNames(
    { 'w-full inline-flex flex-col mb-3': !inline },
    { 'inline mb-3': inline }
  );

  const labelClasses = classNames(
    { 'inline-block w-full pr-2 mb-2': !inline },
    { 'inline pr-2': inline },
    'font-medium text-left'
  )

  const childWrapperClasses = classNames(
    { 'inline-flex flex-row w-full col-span-3': !inline },
    { 'inline': inline }
  );

  let error = props.for in errors ? (errors as any)[props.for] : undefined;
  return (
    <div className={componentClasses}>
      {label &&
        <label className={labelClasses} htmlFor={props.for}>
          {typeof (label) === 'string' ? <>{label}:</> : <>{label}</>}
        </label>
      }
      <div className={childWrapperClasses}>
        {children}
      </div>
      {error && <p className="font-bold text-red-600">{error}</p>}
    </div>
  );
}
