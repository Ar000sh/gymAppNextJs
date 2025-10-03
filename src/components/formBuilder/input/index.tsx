"use client"
import { useFormContext } from "react-hook-form";
import type { InputField } from "@/shared/formTypes";

function getMessage(type?: string, messages?: Record<string, string>) {
  if (!type) return "";
  if (messages?.[type]) return messages[type];
  console.log("type: ", type)
  switch (type) {
    case "required": return "This field is required.";
    case "maxLength": return "Max length exceeded.";
    case "minLength": return "Min length not met.";
    case "pattern": return "Invalid format.";
    case "min": return "Value is too low.";
    case "max": return "Value is too high.";
    case "noSpaces": return "Value cant have spaces.";
    case "hasLower": return "Value must contain at least lowercase letter.";
    case "hasUpper": return "Value must contain at least one uppercase letter.";
    case "hasNumber": return "Value must contain at least one number.";
    case "hasSymbol": return "Value must contain at least one symbol.";
    default: return "Invalid value.";
  }
}

type Props = { field: InputField, formfieldBaseStyles: string };

export default function InputFieldControl({ field, formfieldBaseStyles }: Props) {
  const { register, formState: { errors } } = useFormContext();
  const id = field.id;
  const err = errors[field.name];
  const errType = (err?.type as string | undefined) ?? undefined;

  return (
    <div>
      {field.label && (
        <label htmlFor={id} className="mb-1 block text-sm font-medium">
          {field.label}
        </label>
      )}
      <input
        id={id}
        type={field.inputType ?? "text"}
        placeholder={field.placeholder}
        disabled={field.disabled}
        className={`${formfieldBaseStyles} ${field.className ?? ""}`}
        {...register(field.name, field.rules)}
      />
      {errType && (
        <p className="pt-1.5 text-primary-500">
          {getMessage(errType, field.messages as any)}
        </p>
      )}
    </div>
  );
}