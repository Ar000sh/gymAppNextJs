/*
// src/app/auth/callback/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallback() {
  const { ready, user } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/landing";

  useEffect(() => {
    // Ensure Supabase inspects the current URL (handles magic link fragments).
    // This call is safe to repeat; it just syncs state.
    supabase.auth.getSession();

    // Clean trailing hash (if the provider left one)
    if (typeof window !== "undefined" && window.location.hash) {
      const clean = `${window.location.pathname}${window.location.search}`;
      window.history.replaceState(null, "", clean);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;          // wait until the AuthProvider has initialized
    if (user) router.replace(next);
    // (Optional) if ready && !user after some time => show an error or send to /login
  }, [ready, user, next, router]);

  return (
    <main className="mx-auto w-5/6 max-w-md pt-28 pb-16">
      <div className="rounded-2xl bg-white p-6 shadow-2xl">
        <h1 className="mb-2 text-xl">Verifying…</h1>
        <p className="text-sm text-gray-600">
          Finishing sign in. This may take a moment.
        </p>
      </div>
    </main>
  );
}*/

// src/app/auth/callback/page.tsx
'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';

// stop static prerendering of this client-only route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

function CallbackInner() {
  const { ready, user } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/landing';

  useEffect(() => {
    // Ensure Supabase inspects the current URL (handles magic link fragments)
    void supabase.auth.getSession();

    // Clean trailing hash if provider left one
    if (typeof window !== 'undefined' && window.location.hash) {
      const clean = `${window.location.pathname}${window.location.search}`;
      window.history.replaceState(null, '', clean);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;     // wait for AuthProvider init
    if (user) router.replace(next);
    // optional: else after a timeout -> router.replace('/login?error=auth')
  }, [ready, user, next, router]);

  return (
    <main className="mx-auto w-5/6 max-w-md pt-28 pb-16">
      <div className="rounded-2xl bg-white p-6 shadow-2xl">
        <h1 className="mb-2 text-xl">Verifying…</h1>
        <p className="text-sm text-gray-600">Finishing sign in. This may take a moment.</p>
      </div>
    </main>
  );
}

export default function AuthCallback() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-5/6 max-w-md pt-28 pb-16">
          <div className="rounded-2xl bg-white p-6 shadow-2xl">
            <h1 className="mb-2 text-xl">Verifying…</h1>
            <p className="text-sm text-gray-600">Loading…</p>
          </div>
        </main>
      }
    >
      <CallbackInner />
    </Suspense>
  );
}

