import { createClient } from '@supabase/supabase-js';

// NOTE: In a real production app, these would be in process.env
// For this demo, we initialize with placeholders if env vars are missing to avoid runtime crash on load,
// but Auth functions will fail if not properly configured.
const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const signIn = async (email: string, pass: string) => {
  // Mock login for demo purposes if no real Supabase credentials
  if (supabaseUrl === 'https://placeholder.supabase.co') {
    console.warn("Using mock auth because Supabase is not configured.");
    return { data: { user: { email } }, error: null };
  }
  return await supabase.auth.signInWithPassword({ email, password: pass });
};

export const signUp = async (email: string, pass: string) => {
  if (supabaseUrl === 'https://placeholder.supabase.co') {
     return { data: { user: { email } }, error: null };
  }
  return await supabase.auth.signUp({ email, password: pass });
};

export const signOut = async () => {
  if (supabaseUrl === 'https://placeholder.supabase.co') return { error: null };
  return await supabase.auth.signOut();
};
