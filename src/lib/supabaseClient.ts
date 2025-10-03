import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://fmbihrreauackebrxytm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtYmlocnJlYXVhY2tlYnJ4eXRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0MDc0MjcsImV4cCI6MjA3Mzk4MzQyN30.7A5KQvpVgBEGboEis6PTu5oBy2xiUGK13rt_0QLa7O8",
  {
    auth: {
      persistSession: true,        // keep logged in across reloads
      autoRefreshToken: true,      // refresh JWT automatically
      detectSessionInUrl: true,    // for OAuth/magic-link flows
    },
  }
);
