import { Driver } from "@/types/Driver.type";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { ColorSchemeName, useColorScheme } from "react-native";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

type AuthData = {
  session: Session | null;
  user: Driver | null;
  isLoading: boolean;
  colorScheme: ColorSchemeName;
  updateUserTheme?: (theme: Theme) => void;
};
type Theme = "dark" | "light" | "auto";

const AuthContext = createContext<AuthData>({
  session: null,
  user: null,
  isLoading: true,
  colorScheme: null,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<Driver | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(useColorScheme());
  const [userTheme, setUserTheme] = useState<"dark" | "light" | "auto">("auto");
  const colorSchemeValue = useColorScheme();

  const updateUserTheme = (theme: "dark" | "light" | "auto") => {
    setUserTheme(theme);
  }
  useEffect(() => {
    if (userTheme === "auto") {
      setColorScheme(colorSchemeValue);
    } else if (userTheme === "dark") {
      setColorScheme("dark");
    } else {
      setColorScheme("light");
    }
  }, [useColorScheme(), userTheme]);

  const fetchDriver = async (id: string) => {
    if (id) {
      const { data, error, status } = await supabaseAdmin
      .from("Driver")
      .select("*")
      .eq("id", id)
      .single();
      setUser(data || null);
    }
  }
  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      setSession(session);
      fetchDriver(session?.user.id || "");
      setIsLoading(false);
    };

    fetchSession();
    supabase.auth.onAuthStateChange(async (_event, session) => {
      fetchDriver(session?.user.id || "");
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session, user, isLoading, colorScheme, updateUserTheme }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
