import { FieldValidator } from "formik";
import { AppProps } from "../AppProps";

export declare interface FieldProps extends AppProps {
  autocomplete?: string;
  disabled?: boolean;
  label?: string | JSX.Element;
  multiple?: boolean;
  name: string;
  type?: string;
  inline?: boolean;
  placeholder?: string;
  validate?: FieldValidator;
}

export declare interface TextFieldProps extends FieldProps {
  textSize?: 'sm' | 'md' | 'lg';
}

export declare interface TextAreaProps extends FieldProps {
  rows?: number;
  maxLength?: number;
}

export declare interface NumericFieldProps extends FieldProps {
  max?: number;
  min?: number;
  pattern?: string;
  step?: number;
}
