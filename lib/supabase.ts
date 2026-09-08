import { createClient } from "@supabase/supabase-js";
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = url && anon ? createClient(url, anon) : null;
export const adminSupabase = () => {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase 环境变量尚未配置");
  return createClient(url, key, { auth: { persistSession: false } });
};
