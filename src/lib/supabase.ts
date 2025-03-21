
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials missing');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fonction pour formater l'URL d'une image stockée dans Supabase
export function getSupabaseImageUrl(bucketName: string, path: string) {
  return `${supabaseUrl}/storage/v1/object/public/${bucketName}/${path}`;
}
