import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ntodbclgjrphbezmdvan.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder';

export const isSupabaseConfigured = (): boolean => {
  const key = import.meta.env.VITE_SUPABASE_KEY;
  return Boolean(key && key.trim().length > 0 && !key.includes('placeholder'));
};

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || supabaseUrl,
  import.meta.env.VITE_SUPABASE_KEY || supabaseKey
);
