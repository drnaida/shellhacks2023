import { Field } from "formik";
import { TextFieldProps } from "./FieldProps";
import { FieldWrapper } from "./FieldWrapper";
import { Input } from "./Input";

export function TextField({ autocomplete, disabled, label, name, type, inline, placeholder, textSize, validate, ...props }: TextFieldProps): JSX.Element {
  const widthClasses = inline ? { widthClasses: 'w-64 p-1' } : {};

  return (
    <FieldWrapper label={label} for={name} inline={inline}>
      <Field name={name} as={Input} textSize={textSize} disabled={disabled} type={type} autoComplete={autocomplete} validate={validate} placeholder={placeholder} props={props} />
    </FieldWrapper>
  );
}
