import { ActivityIndicator } from "react-native";
import React from "react";
import { Redirect } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";

const index = () => {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={"/login"} />;
  }

  return <Redirect href={"/(tabs)"} />;
};

export default index;
