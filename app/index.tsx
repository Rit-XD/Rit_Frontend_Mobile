import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/lib/supabase";

const index = () => {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    console.log(session)
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={"/Login"} />;
  }

  return <Redirect href={"/(tabs)"} />;

};

export default index;
