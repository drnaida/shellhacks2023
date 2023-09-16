import classNames from "classnames";
import { Field } from "formik";
import { TextAreaProps } from "./FieldProps";
import { FieldWrapper } from "./FieldWrapper";

export function TextAreaField({ disabled, label, name, type, rows, placeholder, maxLength }: TextAreaProps): JSX.Element {
  const rowsValue = rows ?? 4;
  return (
    <FieldWrapper label={label} for={name}>
      <Field name={name} as={TextArea} placeholder={placeholder} disabled={disabled} type={type} rows={rowsValue} maxLength={maxLength} />
    </FieldWrapper>
  );
}

function TextArea({ children, className, ...props }: TextAreaProps): JSX.Element {
  const componentClasses = classNames(
    'rounded-md w-full p-2.5',
    'border border-slate-300',
    'bg-slate-50 text-darkGray bg-opacity-80 hover:bg-opacity-100',
    'text-sm',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
    'disabled:cursor-not-allowed disabled:bg-slate-200',
    className,
  );
  return <textarea className={componentClasses} {...props}>
    {children}
  </textarea>
}