import { supabaseAdmin } from "../lib/supabaseAdmin";
import {
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { Ride } from "@/types/Ride.type";
import { useAuth } from "./AuthProvider";

type RideData = {
  isLoading: boolean;
  availableRides: Ride[],
  acceptedRides: Ride[],
  fetchRides: () => void;
};

const RideContext = createContext<RideData>({
  isLoading: true,
  availableRides: [],
  acceptedRides: [],
  fetchRides: async () => {},
});

export default function RideProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true);
  const [availableRides, setAvailableRides] = useState<Ride[]>([]);
  const [acceptedRides, setAcceptedRides] = useState<Ride[]>([]);
  const { user } = useAuth();

  const fetchRides = async () => {
    if (!user) return;
    try {
        const { data, error, status } = await supabaseAdmin
        .from("Rides")
        .select("*")
        .is("driver", null)
        .order("timestamp", { ascending: true });
    
        setAvailableRides(data || []);
    } catch (error) {
        console.log("upcoming", error);
    }
    try {
        const { data, error, status } = await supabaseAdmin
        .from("Rides")
        .select("*")
        .eq("driver", user.id)
        .order("timestamp", { ascending: true });

        setAcceptedRides(data || []);
    } catch (error) {
        console.log("accepted", error);
    }
  }

  useEffect(() => {
    fetchRides();
  }, [user]);

  return (
    <RideContext.Provider value={{ isLoading, availableRides, acceptedRides, fetchRides }}>
      {children}
    </RideContext.Provider>
  );
}

export const useRide = () => useContext(RideContext);
