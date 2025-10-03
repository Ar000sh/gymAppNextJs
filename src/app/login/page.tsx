"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FormBuilder from "@/components/formBuilder";
import type { FormField } from "@/shared/formTypes";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function LoginPage() {
  const { signIn } = useAuth();
  const router = useRouter();
  const params = useSearchParams();              // replaces useLocation()
  const next = params.get("next") ?? "/landing"; // fallback path

  const [formError, setFormError] = useState<string | null>(null);

  const fields: FormField[] = [
    {
      type: "input",
      id: "email",
      name: "email",
      label: "Email *",
      placeholder: "you@example.com",
      inputType: "email",
      rules: {
        required: "Email is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address.",
        },
      },
    },
    {
      type: "input",
      id: "password",
      name: "password",
      label: "Password *",
      placeholder: "••••••••",
      inputType: "password",
      rules: { required: "Password is required", minLength: { value: 6, message: "Min 6 characters." } },
    },
  ];

  return (
    <main className="mx-auto w-5/6 max-w-md pt-28 pb-16">
      <div className="rounded-2xl bg-white p-5 shadow-2xl">
        <h1 className="mb-6 text-2xl font-montserrat">Sign in</h1>

        <FormBuilder
          fields={fields}
          submitLabel="Sign in"
          submitStyles="mt-2 rounded-lg bg-secondary-500 px-6 py-2 text-white hover:bg-primary-500"
          formfieldBaseStyles="mb-4 w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-white"
          className="flex flex-col gap-2 rounded-2xl"
          onValid={async (data) => {
            try {
              setFormError(null);
              await signIn(data.email as string, data.password as string);
              router.replace(next);
            } catch (err: unknown) {
              // Narrow the error safely:
              let message = 'Sign in failed.';
              if (err instanceof Error) message = err.message;
              // If using Supabase's AuthError:
              // else if (err instanceof AuthError) message = err.message;
              setFormError(message);
            }
          }}
          onInvalid={() => setFormError("Please fix the highlighted fields.")}
        />

        {formError && <p className="mt-3 text-sm text-primary-500">{formError}</p>}

        <p className="mt-4 text-sm">
          No account? <Link href="/signup" className="text-primary-500">Create one</Link>
        </p>
      </div>
    </main>
  );
}
