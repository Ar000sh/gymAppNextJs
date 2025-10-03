"use client"
import { useFormContext } from "react-hook-form";
import type { TextareaField } from "@/shared/formTypes";

function getMessage(type?: string, messages?: Record<string, string>) {
  if (!type) return "";
  if (messages?.[type]) return messages[type];
  switch (type) {
    case "required": return "This field is required.";
    case "maxLength": return "Max length exceeded.";
    case "minLength": return "Min length not met.";
    default: return "Invalid value.";
  }
}

type Props = { field: TextareaField, formfieldBaseStyles: string };

export default function TextareaFieldControl({ field, formfieldBaseStyles }: Props) {
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
      <textarea
        id={id}
        placeholder={field.placeholder}
        rows={field.rows ?? 4}
        cols={field.cols}
        disabled={field.disabled}
        className={`${formfieldBaseStyles} ${field.className ?? ""}`}
        {...register(field.name, field.rules)}
      />
      {errType && (
        <p className="pt-0.3 text-primary-500">
          {getMessage(errType, field.messages as any)}
        </p>
      )}
    </div>
  );
}
