import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import Login from "@/components/auth/Login";

export default function RootPage() { 
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })
  
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
    }, [])

    return (
        <View>
            {session && session.user ? <Redirect href={"/home"} /> : <Login />}
        </View>
    )
 }