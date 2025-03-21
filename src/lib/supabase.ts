
import { createClient } from '@supabase/supabase-js';

// Default to empty strings but with a warning in the console
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Log a warning but don't throw an error so the app can still initialize
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials are missing. Some features may not work correctly.');
}

// Create the client even with empty strings (it will fail gracefully on operations)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to format image URL stored in Supabase
export function getSupabaseImageUrl(bucketName: string, path: string) {
  if (!supabaseUrl) return '';
  return `${supabaseUrl}/storage/v1/object/public/${bucketName}/${path}`;
}

// Check if Supabase is properly configured
export function isSupabaseConfigured() {
  return !!supabaseUrl && !!supabaseAnonKey;
}
