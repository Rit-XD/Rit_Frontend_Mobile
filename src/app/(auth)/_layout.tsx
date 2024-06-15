import LoginRegisterSlider from "@/components/ui/Slider";
import { useAuth } from "@/providers/AuthProvider";
import { Redirect, Stack } from "expo-router";
import { ScrollView, View, ViewBase } from "react-native";

export default function AuthLayout() {
  const { session } = useAuth();

  if (session) {
    return <Redirect href={"/home"} />;
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "transparent", height: "100%" },
        }}
      >
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
      </Stack>
      <LoginRegisterSlider initialActive="login" />
    </>
  );
}
