import { supabase } from "../lib/supabase";
import { supabaseAdmin } from "../lib/supabaseAdmin";
import { Session } from "@supabase/supabase-js";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthData = {
  session: Session | null;
  user: any;
  isLoading: boolean;
};

const AuthContext = createContext<AuthData>({
  session: null,
  user: null,
  isLoading: true,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
      if (session?.user.id) {
        const { data, error, status } = await supabaseAdmin
          .from("Driver")
          .select("*")
          .eq("id", session.user.id)
          .single();

        setUser(data || null);
      }
      setIsLoading(false);
    };


    fetchSession();
    supabase.auth.onAuthStateChange(async (_event, session) => { 
        setSession(session);
        if (session?.user.id) {
            const { data, error, status } = await supabaseAdmin
            .from('Carecenter')
            .select("*")
            .eq('id', session.user.id)
            .single()

            setUser(data || null);
        }
    });
    }, []);

  return (
    <AuthContext.Provider value={{ session, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
