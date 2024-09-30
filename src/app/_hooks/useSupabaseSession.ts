import { supabase } from "@/utils/supabase";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const useSupabaseSession = () => {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log(session);

      setSession(session);
      setToken(session?.access_token || null);
      setIsLoading(false);
    };
    fetcher();
  }, []);
  return { session, isLoading, token };
};
