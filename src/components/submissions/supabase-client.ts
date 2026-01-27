import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  'https://qshyifbipsyrowssjqnd.supabase.co';
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  'sb_publishable_fPG8qs1FKKvqYKsdTsCYjg_iWGNgwPN';

let browserClient: SupabaseClient | null = null;

export const getBrowserSupabaseClient = () => {
  if (!supabaseUrl || !supabasePublishableKey) {
    return null;
  }

  if (!browserClient) {
    browserClient = createClient(supabaseUrl, supabasePublishableKey);
  }

  return browserClient;
};
