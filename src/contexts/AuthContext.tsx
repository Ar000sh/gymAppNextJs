"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type AuthUser = { id: string; email: string | null } | null;
type AuthMode = "signin" | "signup";

type AuthContextType = {
  ready: boolean;                   // auth initialized
  user: AuthUser;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, options?: { emailRedirectTo?: string } ) => Promise<void>;
  resendVerficationEmail: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  // modal controls
  open: boolean;
  mode: AuthMode;
  openAuth: (mode: AuthMode) => void;
  closeAuth: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<AuthUser>(null);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("signin");

  // Initialize from current session & subscribe to changes
  useEffect(() => {
    let unsub: (() => void) | undefined;

    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log("session: ", session)
      setUser(session?.user ? { id: session.user.id, email: session.user.email } as AuthUser : null);
      setReady(true);
      const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
        setUser(sess?.user ? { id: sess.user.id, email: sess.user.email } as AuthUser : null);
      });
      unsub = () => sub.subscription.unsubscribe();
    })();

    return () => { unsub?.(); };
  }, []);

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    setOpen(false);
  }

  /*async function signUp(email: string, password: string) {
    // You can enable email confirmations in Supabase auth settings.
    const { error } = await supabase.auth.signUp({ email, password });
    console.log("Something something")
    if (error) throw error;
    // Optional: auto-close; you may want to inform user to check email.
    setOpen(false);
  }*/

  async function signUp(email: string, password: string, options?: { emailRedirectTo?: string }) {
  const { error } = await supabase.auth.signUp({ email, password, options });
  if (error) throw error;
  setOpen(false); // if you still use the modal elsewhere
}
async function resendVerficationEmail(email:string) {
  const { error } = await supabase.auth.resend({ type: "signup", email });
  if (error) throw error;
}
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  const value = useMemo(
    () => ({
      ready,
      user,
      signIn,
      signUp,
      resendVerficationEmail,
      signOut,
      open,
      mode,
      openAuth: (m: AuthMode) => { 
        console.log("m: ", m)
        setMode(m); 
        setOpen(true); 
    },
      closeAuth: () => setOpen(false),
    }),
    [ready, user, open, mode]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
