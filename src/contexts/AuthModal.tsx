// src/auth/AuthModal.tsx
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "./AuthContext";

type FormValues = { email: string; password: string };

export default function AuthModal() {
  const { open, mode, closeAuth, signIn, signUp } = useAuth();
  const panelRef = useRef<HTMLDivElement>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeAuth();
    const onPtr = (e: PointerEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) closeAuth();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPtr);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPtr);
    };
  }, [open, closeAuth]);

  const onSubmit = async (data: FormValues) =>
    mode === "signin" ? signIn(data.email, data.password) : signUp(data.email, data.password);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 w-full h-full">
      <div className="absolute inset-0 bg-black/40" />
      <div ref={panelRef} className="absolute right-1/2 top-1/2 w-[92%] max-w-md -translate-y-1/2 translate-x-1/2 rounded-2xl bg-white p-6 shadow-2xl">
        <h2 className="text-xl font-montserrat mb-4">{mode === "signin" ? "Sign in" : "Create account"}</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="mb-3 w-full rounded-lg bg-primary-300 px-4 py-3 placeholder-white"
            {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" } })}
          />
          {errors.email && <p className="text-primary-500 mb-3">{errors.email.message}</p>}
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            className="mb-4 w-full rounded-lg bg-primary-300 px-4 py-3 placeholder-white"
            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 chars" } })}
          />
          {errors.password && <p className="text-primary-500 mb-4">{errors.password.message}</p>}

          <div className="mt-2 flex items-center justify-between">
            <button type="button" onClick={closeAuth} className="rounded-lg px-4 py-2 text-gray-600 hover:text-gray-800">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="rounded-lg bg-secondary-500 px-6 py-2 text-white disabled:opacity-60">
              {isSubmitting ? "…" : mode === "signin" ? "Sign in" : "Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
