"use client"
import React from "react";
import { FormProvider, useForm, type FieldErrors } from "react-hook-form";
import type { FormField } from "@/shared/formTypes";

import InputFieldControl from "./input";
import TextareaFieldControl from "./textarea";

type FormBuilderProps = {
  fields: FormField[];
  className?: string;
  submitLabel?: string;
  submitStyles?: string;
  formfieldBaseStyles?: string;
  defaultValues?: Record<string, any>;
  onValid?: (data: Record<string, any>) => void;
  onInvalid?: (errors: FieldErrors) => void;

  // native submit support
  action?: string;
  method?: "GET" | "POST";
  target?: React.HTMLAttributeAnchorTarget;
};

export default function FormBuilder({
  fields,
  className,
  submitLabel = "Submit",
  submitStyles = "mt-5 rounded-lg bg-secondary-500 px-20 py-3 transition duration-500 hover:text-white",
  formfieldBaseStyles = "mb-5 w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-white",
  defaultValues,
  onValid,
  onInvalid,
  action,
  method = "POST",
  target,
}: FormBuilderProps) {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  const submitHandler = (data: Record<string, any>, event?: React.BaseSyntheticEvent) => {
    if (action) {
      (event?.target as HTMLFormElement | undefined)?.submit?.();
      return;
    }
    onValid?.(data);
  };


  console.log("classname: ", className)
  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(submitHandler, (e) => onInvalid?.(e))}
        action={action}
        method={method}
        target={target}
        noValidate
      >
        {fields.map((field) => {
          switch (field.type) {
            case "input":
              return <InputFieldControl key={field.id} field={field} formfieldBaseStyles={formfieldBaseStyles} />;
            case "textarea":
              return <TextareaFieldControl key={field.id} field={field} formfieldBaseStyles={formfieldBaseStyles} />;
            default:
              // If you add a new type and forget to handle it, TS will warn you here.
              return null;
          }
        })}

        <button
          type="submit"
          className={submitStyles}
        >
          {submitLabel}
        </button>
      </form>
    </FormProvider>
  );
}
