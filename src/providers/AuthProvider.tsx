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
import { Ride } from "@/types/Ride.type";

type AuthData = {
  session: Session | null;
  user: any;
  isLoading: boolean;
  availableRides: Ride[],
  acceptedRides: Ride[],
};

const AuthContext = createContext<AuthData>({
  session: null,
  user: null,
  isLoading: true,
  availableRides: [],
  acceptedRides: [],
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [availableRides, setAvailableRides] = useState<Ride[]>([]);
  const [acceptedRides, setAcceptedRides] = useState<Ride[]>([]);

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
        .eq("id", session?.user.id)
        .single();
  
        setUser(data || null);
        
        const { data: availableRides, error: arError, status: arStatus } = await supabaseAdmin
        .from("Rides")
        .select("*")
        .is("driver", null)
        .order("timestamp", { ascending: true });

        setAvailableRides(availableRides || []);

        const { data: acceptedRides, error: acceptedError, status: acceptedStatus } = await supabaseAdmin
        .from("Rides")
        .select("*")
        .eq("driver", session?.user.id)
        .order("timestamp", { ascending: true });

  
        setAcceptedRides(acceptedRides || []);
      }
      setIsLoading(false);
    };

    fetchSession();
    supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session?.user.id) {
        const { data, error, status } = await supabaseAdmin
        .from("Driver")
        .select("*")
        .eq("id", session?.user.id)
        .single();
  
        setUser(data || null);
        
        const { data: availableRides, error: arError, status: arStatus } = await supabaseAdmin
        .from("Rides")
        .select("*")
        .is("driver", null)
        .order("timestamp", { ascending: true });


        setAvailableRides(availableRides || []);

        const { data: acceptedRides, error: acceptedError, status: acceptedStatus } = await supabaseAdmin
        .from("Rides")
        .select("*")
        .eq("driver", session?.user.id)
        .order("timestamp", { ascending: true });

  
        setAcceptedRides(acceptedRides || []);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session, user, isLoading, availableRides, acceptedRides }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
