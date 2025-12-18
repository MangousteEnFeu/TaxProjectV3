import { createClient } from '@supabase/supabase-js';
import { TaxData } from '../types';

// ------------------------------------------------------------------
// CONFIGURATION SUPABASE
// ------------------------------------------------------------------
// SQL pour créer la table nécessaire :
/*
create table declarations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  name text,
  data jsonb,
  status text default 'draft',
  year integer,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);
*/
// ------------------------------------------------------------------

const PROJECT_URL = process.env.SUPABASE_URL || "https://vsvcxdufsxngdrguohtj.supabase.co";
const ANON_KEY = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzdmN4ZHVmc3huZ2RyZ3VvaHRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5NDY4NzAsImV4cCI6MjA4MTUyMjg3MH0.7kIU9IdvfI5Mm8NaA9y_OflXtkPn7yCGf4gAG8F3rYQ";

export const supabase = createClient(PROJECT_URL, ANON_KEY);

// Helper pour vérifier si Supabase est configuré
const isSupabaseConfigured = () => {
  return PROJECT_URL !== "https://placeholder.supabase.co" && 
         !PROJECT_URL.includes("VOTRE_URL") &&
         ANON_KEY !== "placeholder";
};

export const signIn = async (email: string, pass: string) => {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase non configuré. Mode démo actif.");
    await new Promise(r => setTimeout(r, 1000));
    return { data: { user: { email, id: 'demo-user-123' } }, error: null };
  }
  return await supabase.auth.signInWithPassword({ email, password: pass });
};

export const signUp = async (email: string, pass: string) => {
  if (!isSupabaseConfigured()) {
     console.warn("Supabase non configuré. Mode démo actif.");
     await new Promise(r => setTimeout(r, 1000));
     return { data: { user: { email, id: 'demo-user-123' } }, error: null };
  }
  return await supabase.auth.signUp({ email, password: pass });
};

export const signOut = async () => {
  if (!isSupabaseConfigured()) return { error: null };
  return await supabase.auth.signOut();
};

// --- CRUD Declarations ---

export const saveDeclaration = async (userId: string, data: TaxData, name?: string, id?: string) => {
    if (!isSupabaseConfigured()) return { data: null, error: null };
    
    const payload = {
        user_id: userId,
        data: data,
        name: name || `Déclaration ${data.identification.periodeDebut.split('-')[0]}`,
        year: parseInt(data.identification.periodeDebut.split('-')[0]),
        updated_at: new Date().toISOString()
    };

    if (id) {
        return await supabase.from('declarations').update(payload).eq('id', id).select().single();
    } else {
        return await supabase.from('declarations').insert(payload).select().single();
    }
};

export const getDeclarations = async (userId: string) => {
    if (!isSupabaseConfigured()) return { data: [], error: null };
    return await supabase.from('declarations').select('*').eq('user_id', userId).order('updated_at', { ascending: false });
};

export const getDeclarationById = async (id: string) => {
    if (!isSupabaseConfigured()) return { data: null, error: null };
    return await supabase.from('declarations').select('*').eq('id', id).single();
};
