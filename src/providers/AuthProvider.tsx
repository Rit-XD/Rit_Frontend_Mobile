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

  const fetchUser = async () => {
    const { data, error, status } = await supabaseAdmin
      .from("Driver")
      .select("*")
      .eq("id", session?.user.id)
      .single();

    setUser(data || null);
  }
  const fetchRides = async () => {
    const { data: availableRides, error, status } = await supabaseAdmin
      .from("Ride")
      .select("*")
      .eq("driver", null);

    setAvailableRides(availableRides || []);

    const { data: acceptedRides, error: acceptedError, status: acceptedStatus } = await supabaseAdmin
      .from("Ride")
      .select("*")
      .eq("driver", session?.user.id);

    setAcceptedRides(acceptedRides || []);
  }

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
      if (session?.user.id) {
        fetchUser();
        fetchRides();
      }
      setIsLoading(false);
    };

    fetchSession();
    supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session?.user.id) {
        fetchUser();
        fetchRides();
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
