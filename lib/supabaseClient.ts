import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Database types
export interface Lead {
  id: string;
  created_at: string;
  name: string;
  contact: string;
  message: string;
}

export type LeadInsert = Omit<Lead, 'id' | 'created_at'>;

// Lazy singleton — client is created on first call, not at module evaluation.
// This prevents build-time crashes when env vars contain placeholder values.
let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (_client) return _client;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || supabaseUrl === 'your_supabase_project_url') {
    throw new Error(
      'NEXT_PUBLIC_SUPABASE_URL is not set. Add it to .env.local'
    );
  }

  if (!supabaseAnonKey || supabaseAnonKey === 'your_supabase_anon_key') {
    throw new Error(
      'NEXT_PUBLIC_SUPABASE_ANON_KEY is not set. Add it to .env.local'
    );
  }

  _client = createClient(supabaseUrl, supabaseAnonKey);
  return _client;
}

export { getClient as supabase };
