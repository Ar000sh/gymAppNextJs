import type { RegisterOptions } from "react-hook-form";

export type FieldKind = "input" | "textarea";

export type BaseField = {
  type: FieldKind;
  name: string;
  id: string;  
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  rules?: RegisterOptions;      // react-hook-form validation rules
  messages?: Partial<Record<string, string>>; // custom error messages
};

export type InputField = BaseField & {
  type: "input";
  inputType?: React.HTMLInputTypeAttribute; // text | email | password | number | ...
};

export type TextareaField = BaseField & {
  type: "textarea";
  rows?: number;
  cols?: number;
};

export type FormField = InputField | TextareaField;
