import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ntodbclgjrphbezmdvan.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || 'sb_publishable_BEDFnyXJIGV66dz7wh0ihg_Acuzca1z';

export const isSupabaseConfigured = (): boolean => {
  const key = import.meta.env.VITE_SUPABASE_KEY || supabaseKey;
  return Boolean(key && key.trim().length > 0 && !key.includes('placeholder'));
};

export const supabase = createClient(supabaseUrl, supabaseKey);
