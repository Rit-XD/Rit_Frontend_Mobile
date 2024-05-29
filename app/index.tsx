import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/lib/supabase";

const index = () => {
  const { session, isLoading } = useAuth();

  if (isLoading) {
<<<<<<< HEAD
=======
    console.log(session);
>>>>>>> e9457e6ee225fc6c03705820cdc16e253ce83944
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={"/login"} />;
  }

  return <Redirect href={"/(tabs)"} />;
};

export default index;
