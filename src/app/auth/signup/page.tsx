"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import FormBuilder from "@/components/formBuilder";
import type { FormField } from "@/shared/formTypes";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type Dict = Record<string, unknown>;

export default function SignupPage() {
  const { signUp, resendVerficationEmail } = useAuth();
  const [verifyEmailView, setVerifyEmailView] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const redirectTo =
    typeof window !== "undefined"
      ? `${window.location.origin}/callback`
      : "/auth/callback";

  const fields: FormField[] = [
    {
      type: "input",
      id: "name",
      name: "name",
      label: "Name *",
      placeholder: "Max",
      inputType: "text",
      rules: { required: "Name is required" },
    },
    {
      type: "input",
      id: "email",
      name: "email",
      label: "Email *",
      placeholder: "you@example.com",
      inputType: "email",
      rules: { required: "Email is required" },
    },
    {
      type: "input",
      id: "password",
      name: "password",
      label: "Password *",
      placeholder: "••••••••",
      inputType: "password",
      rules: {
        required: "Password is required",
        minLength: { value: 8, message: "Min 8 characters." },
        validate: {
          noSpaces: (v: string) => !/\s/.test(v) || "No spaces allowed",
          hasLower: (v: string) => /[a-z]/.test(v) || "Add a lowercase letter",
          hasUpper: (v: string) => /[A-Z]/.test(v) || "Add an uppercase letter",
          hasNumber: (v: string) => /\d/.test(v) || "Add a number",
          hasSymbol: (v: string) => /[^A-Za-z0-9]/.test(v) || "Add a symbol",
        },
      },
    },
    {
      type: "input",
      id: "verify-password",
      name: "verifyPassword",
      label: "Verify Password *",
      placeholder: "••••••••",
      inputType: "password",
      rules: { required: "Please re-enter your password" },
    },
  ];

  function getLoose(obj: Dict, key: string) {
    return obj[key];
  }

  return (
    <main className="mx-auto w-5/6 max-w-md pt-28 pb-16">
      <div className="rounded-2xl bg-white p-5 shadow-2xl">
        {!verifyEmailView ? (
          <>
            <h1 className="font-montserrat mb-6 text-2xl">Sign up</h1>

            <FormBuilder
              fields={fields}
              submitLabel="Sign up"
              submitStyles="mt-2 rounded-lg bg-secondary-500 px-6 py-2 text-white hover:bg-primary-500"
              formfieldBaseStyles="mb-4 w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-white"
              className="flex flex-col gap-2 rounded-2xl"
              onValid={async (data) => {
                const password = getLoose(data, "password") as string;
                const verifyPassword = getLoose(
                  data,
                  "verifyPassword",
                ) as string;

                if (password !== verifyPassword) {
                  setFormError("Passwords are not identical.");
                  return;
                }

                try {
                  setFormError(null);
                  await signUp(data.email as string, data.password as string, {
                    emailRedirectTo: redirectTo,
                  });
                  setEmail(data.email as string);
                  setVerifyEmailView(true);
                } catch (err: unknown) {
                  // Narrow the error safely:
                  let message = "Sign up failed.";
                  if (err instanceof Error) message = err.message;
                  // If using Supabase's AuthError:
                  // else if (err instanceof AuthError) message = err.message;
                  setFormError(message);
                }
              }}
              onInvalid={() =>
                setFormError("Please fix the highlighted fields.")
              }
            />

            {formError && (
              <p className="text-primary-500 mt-3 text-sm">{formError}</p>
            )}

            <p className="mt-4 text-sm">
              Have an account?{" "}
              <Link
                href={{ pathname: "/auth/login" }}
                className="text-primary-500"
              >
                Log in
              </Link>
            </p>
          </>
        ) : (
          email && (
            <>
              <div className="flex items-center justify-center pb-3">
                <img
                  className="h-24 w-24"
                  src="/assets/paperPlane.svg"
                  alt=""
                />
              </div>
              <h1 className="pb-3 text-center text-2xl font-bold text-black">
                Please verfiy your email
              </h1>
              <p className="text-center text-black">
                we have send you an email to this address:
              </p>
              <p className="text-center text-black"> {email}</p>
              <p className="text-center text-black">
                if you dont find it please check your spam folder
              </p>
              <div className="flex w-full items-center justify-center pt-5">
                <button
                  className="rounded-lg bg-gray-200 px-4 py-2 text-black hover:bg-gray-300"
                  onClick={async () => {
                    // resend verification
                    await resendVerficationEmail(email);
                    // show a small toast or message if you want
                  }}
                >
                  Resend email
                </button>
              </div>
            </>
          )
        )}
      </div>
    </main>
  );
}
