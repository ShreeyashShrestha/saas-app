import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
export const createSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is required.");
  }

  if (!supabaseKey) {
    throw new Error("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is required.");
  }

  return createClient(
    supabaseUrl,
    supabaseKey,
    {
      async accessToken() {
        return (await auth()).getToken();
      },
    },
  );
};
