import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Retrieve credentials from environment variables or runtime configuration
const envSupabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const envSupabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  envSupabaseUrl &&
  envSupabaseAnonKey &&
  envSupabaseUrl !== 'https://your-project.supabase.co' &&
  !envSupabaseUrl.includes('placeholder')
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(envSupabaseUrl, envSupabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

// Helper to test connectivity
export async function testSupabaseConnection(): Promise<{ success: boolean; message: string }> {
  if (!supabase) {
    return { success: false, message: 'Supabase credentials not configured yet. Running in offline couple mode.' };
  }
  try {
    const { data, error } = await supabase.from('couples').select('count', { count: 'exact', head: true });
    if (error) {
      return { success: false, message: `Connected to Supabase URL, but database returned: ${error.message}` };
    }
    return { success: true, message: 'Successfully connected to Supabase PostgreSQL!' };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { success: false, message: `Connection error: ${msg}` };
  }
}
