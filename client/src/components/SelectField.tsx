import { Field } from "formik";
import { FieldProps } from "./FieldProps";
import { FieldWrapper } from "./FieldWrapper";
import { Select } from "./Select";

export function SelectField({ children, disabled, label, name, multiple, inline }: FieldProps): JSX.Element {
  return <FieldWrapper label={label} for={name} inline={inline}>
    <Field name={name} as={Select} disabled={disabled} multiple={multiple} className="disabled:bg-slate-200">
      {children}
    </Field>
  </FieldWrapper>
}
