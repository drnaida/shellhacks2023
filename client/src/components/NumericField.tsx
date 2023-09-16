import { Field } from "formik";
import { NumericFieldProps } from "./FieldProps";
import { FieldWrapper } from "./FieldWrapper";
import { Input } from "./Input";

export function NumericField({ max, min, pattern, step, disabled, label, name, inline, placeholder }: NumericFieldProps): JSX.Element {
  const widthClasses = inline ? { widthClasses: 'w-64 p-1' } : {};

  return (
    <FieldWrapper label={label} for={name} inline={inline}>
      <Field name={name} type="number" as={Input} max={max} min={min} pattern={pattern} step={step} disabled={disabled} placeholder={placeholder} />
    </FieldWrapper>
  );
}
