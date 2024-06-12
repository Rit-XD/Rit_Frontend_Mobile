import { supabaseAdmin } from "../lib/supabaseAdmin";
import {
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { Carecenter } from "@/types/Carecenter.type";
import { useRide } from "./RideProvider";

type CareData = {
  isLoading: boolean;
  carecenters: Carecenter[];
  getCarecenter: (id: string) => Carecenter | null;
};

const CareContext = createContext<CareData>({
  isLoading: true,
  carecenters: [],
  getCarecenter: (id: string) => null,
});

export default function CareProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true);
  const [carecenters, setCarecenters] = useState<Carecenter[]>([]);
  const { availableRides, acceptedRides } = useRide();

  const fetchCarecenters = async () => {
    const { data: carecenters, error: ccError, status: ccStatus } = await supabaseAdmin
    .from("Carecenter")
    .select("name, id, phone")
    .in("id", availableRides.map(ride => ride.carecenter_id).concat(acceptedRides.map(ride => ride.carecenter_id)));

    setCarecenters(carecenters || []);
  }
  const getCarecenter = (id: string): Carecenter | null => {
    const foundCarecenter = carecenters.find(carecenter => carecenter.id === id);
    if (foundCarecenter) {
      return foundCarecenter;
    }
    return null;
  };

  useEffect(() => {
    fetchCarecenters();
    setIsLoading(false);
  }, [availableRides, acceptedRides]);

  return (
    <CareContext.Provider value={{ isLoading, carecenters, getCarecenter }}>
      {children}
    </CareContext.Provider>
  );
}

export const useCarecenter = () => useContext(CareContext);
