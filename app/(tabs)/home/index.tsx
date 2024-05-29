import { Image, StyleSheet, Platform, View, Button } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { Redirect, Stack } from "expo-router";

export default function HomeScreen() {
  const [logout, setLogout] = useState(false);
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    setLogout(true);
  }
  return (
    <View >
      <Stack screenOptions={{headerShown: false}}/>
      <Button title="logout" onPress={signOut}></Button>
      {logout && <Redirect href={"/"} />}
    </View>
  );
}

const styles = StyleSheet.create({

});
